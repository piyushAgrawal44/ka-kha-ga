import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";
import path from "path";
import { config } from "../config/index.js";

// Ensure logs directory exists (only if file logging enabled)
if (config.generateLogFile && !fs.existsSync(config.logDirectory)) {
    fs.mkdirSync(config.logDirectory, { recursive: true });
}

// Console format
const consoleFormat = winston.format.printf(({ level, message, timestamp, ...meta }) => {
    const metaData = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaData}`;
});

// Console transport (always active)
const consoleTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        consoleFormat
    ),
});

// File transport (daily rotation) — only created if enabled
const fileTransport =
    config.generateLogFile
        ? new DailyRotateFile({
            dirname: config.logDirectory,
            filename: "%DATE%.log",
            datePattern: "YYYY-MM-DD",
            zippedArchive: false,
            maxSize: "10m",
            maxFiles: "14d",
            level: "debug", // capture all logs
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        })
        : null;

// Base winston logger
const baseLogger = winston.createLogger({
    level: "debug",
    transports: fileTransport ? [consoleTransport, fileTransport] : [consoleTransport],
});

// Custom wrapper
interface LogPayload {
    message: string;
    object?: any;
    appendToFile?: boolean;
}

const createLoggerMethod =
    (level: string) =>
        ({ message, object = {}, appendToFile = true }: LogPayload): void => {
            console.log(typeof object,)
            // Always log to console
            baseLogger.log({ level, message, ...(typeof object === "object" && object !== null ? object : { object }), });

            // Append to file if enabled + requested
            if (fileTransport && appendToFile && config.generateLogFile) {
                // @ts-ignore
                fileTransport.log({ level, message, ...(typeof object === "object" && object !== null ? object : { object }), });
            }
        };

export const logger = {
    info: createLoggerMethod("info"),
    debug: createLoggerMethod("debug"),
    warn: createLoggerMethod("warn"),
    error: createLoggerMethod("error"),
};
