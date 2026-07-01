import dotenv from 'dotenv';

dotenv.config();

export const header = {
    'x-api-key': process.env.API_KEY!
};