/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly EMAIL_HOST: string;
    readonly EMAIL_PORT: string;
    readonly EMAIL_USER: string;
    readonly EMAIL_PASS: string;
    readonly EMAIL_FROM: string;
    readonly EMAIL_TO_1: string;
    readonly EMAIL_TO_2: string;
    readonly EMAIL_FRANCHISE: string;
    readonly RECAPTCHA_SECRET_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}