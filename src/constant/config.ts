export const VERSION_NUM = "0.0.5";
export const APP_ENV = process.env.APP_ENV || "dev";

export const DB_HOST = process.env.DB_HOST;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;

export const PORT = process.env.PORT || "3000";

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;
export const SMTP_USERNAME = process.env.SMTP_USERNAME || "default";
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "default";

export const TWILIO_PHONE_NUM = process.env.TWILIO_PHONE_NUM;
export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "ACb7c6c11a12c9e0492ba68ff0c6984e8c";
export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "default";

export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

export const ACCESS_TOKEN_EXPIRE_TIME = process.env.ACCESS_TOKEN_EXPIRE_TIME || "30d";
export const REFERSH_TOKEN_EXPIRE_TIME = process.env.REFERSH_TOKEN_EXPIRE_TIME || "180d";
export const PASSWORD_SALT_ROUND = 10;

export const GOOGLE_CLIENT_ID = "549401078361-i71620ipt8nljerc5r40lq2u2dmp4mlb.apps.googleusercontent.com";
export const APPLE_CLIENT_SECRET = "AA";

export const SENDGRID_TEMPLATE_ID = "d-575e4f8cbf4b48d5835a9bad37c2d012";
export const SENDGRID_API_KEY = "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";

export const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
export const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
