import dotenv from "dotenv";

const env = process.env.TEST_ENV || "qa";

dotenv.config({
    path: `.env.${env}`
});

console.log(`Running tests on ${env.toUpperCase()} environment`);