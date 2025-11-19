import 'dotenv/config';

export const config = {
    appName: process.env.APP_NAME || "क-ख-ग",
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4500,
    frontendAppDomain: process.env.FRONTEND_APP_DOMAIN || "https://ka-kha-ga.vercel.app",
    dbUrl: process.env.DATABASE_URL,
    cryptoEncryptionSecreteKey: process.env.CRYPTO_ENCRYPTION_SECRETE_KEY || "ANY_RANDOM_KEY_HERE_98923",
    generateLogFile: process.env.GENERATE_LOG_FILE === 'true',
    jwtSecret: process.env.JWT_SECRET || "RadheRadhe@#@dkhj20923#$sdkj",
    jwtTokenExpiry: process.env.JWT_TOKEN_EXPIRY || "1h",
    logDirectory: process.env.LOG_DIR || "logs",
    corsOrigin: process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:5169","https://ka-kha-ga.vercel.app"]
};
