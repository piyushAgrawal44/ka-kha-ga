import crypto from "crypto";
import { config } from "../config/index.js";

class EncryptionUtil {
    private readonly secretKey: Buffer;
    private readonly ivLength = 16;

    constructor(secret: string = config.cryptoEncryptionSecreteKey) {
        if (secret.length !== 32) {
            throw new Error("Encryption secret must be 32 characters long (256-bit key).");
        }
        this.secretKey = Buffer.from(secret);
    }

    encrypt(value: string): string {
        const iv = crypto.randomBytes(this.ivLength);
        const cipher = crypto.createCipheriv("aes-256-cbc", this.secretKey, iv);

        let encrypted = cipher.update(value, "utf8");
        encrypted = Buffer.concat([encrypted, cipher.final()]);

        return Buffer.concat([iv, encrypted]).toString("base64url");
    }

    decrypt(encryptedValue: string): string {
        const raw = Buffer.from(encryptedValue, "base64url");
        const iv = raw.subarray(0, this.ivLength);
        const encrypted = raw.subarray(this.ivLength);

        const decipher = crypto.createDecipheriv("aes-256-cbc", this.secretKey, iv);

        let decrypted = decipher.update(encrypted);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString();
    }
}

export const EncryptionUtilInstance = new EncryptionUtil();