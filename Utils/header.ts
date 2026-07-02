import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.API_KEY?.trim();

export const header = apiKey ? { 'x-api-key': apiKey } : {};