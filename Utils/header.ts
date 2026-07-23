import { Config } from "../config/config";

export const getHeaders = (): Record<string, string> => ({
    "x-api-key": Config.apiKey
});