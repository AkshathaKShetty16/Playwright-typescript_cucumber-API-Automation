// export const Config = {
//     environment: process.env.ENV || "qa",
//     baseUrl: process.env.BASE_URL!,
//     apiKey: process.env.API_KEY!
// };

export const Config = {
    get environment() {
        return process.env.ENV || "qa";
    },

    get baseUrl() {
        return process.env.BASE_URL || "";
    },

    get apiKey() {
        return process.env.API_KEY || "";
    }
};