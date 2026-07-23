import dotenv from "dotenv";
import path from "path";

const env = process.env.ENV || "qa";

const envPath = path.resolve(process.cwd(), `config/.env.${env}`);

const result = dotenv.config({
  path: envPath,
});

if (result.error) {
  throw new Error(`Failed to load environment file: ${envPath}`);
}

console.log(`Environment Loaded : ${env.toUpperCase()}`);

