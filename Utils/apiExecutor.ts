import { ApiClient } from "./apiClient";
import { AllureHelper } from "./allurehelper";
import { logger } from "./logger";
import { header } from "./header";

export class ApiExecutor {

    static async execute(
        world: any,
        method: "GET" | "POST" | "PUT" | "DELETE",
        endpoint: string,
        requestBody?: any,
        headers?: Record<string, string>

    ) {

        const apiClient = new ApiClient(world.request);
        logger.info("==============================================");
        logger.info(`HTTP Method : ${method}`);
        logger.info(`Request URL : ${endpoint}`);
        logger.info(
            `Request Headers :\n${JSON.stringify(headers ?? header, null, 2)}`
        );

        logger.info(
            `Request Headers :\n${JSON.stringify(headers ?? header, null, 2)}`
        );

        if (requestBody) {
            logger.info(
                `Request Body :\n${JSON.stringify(requestBody, null, 2)}`
            );
        }

        switch (method) {

            case "GET":
                world.response = await apiClient.get(endpoint, headers);
                break;

            case "POST":
                world.response = await apiClient.post(endpoint, requestBody, headers);
                break;

            case "PUT":
                world.response = await apiClient.put(endpoint, requestBody, headers);
                break;

            case "DELETE":
                world.response = await apiClient.delete(endpoint, headers);
                break;
        }

        try {

            world.responseBody = await world.response.json();

            logger.info(`Response Status : ${world.response.status()}`);

            logger.info(
                `Response Body :\n${JSON.stringify(world.responseBody, null, 2)}`
            );

        } catch {

            world.responseBody = null;

            logger.warn("Response Body : No JSON response returned.");

        }

        AllureHelper.attachRequest(
            world,
            method,
            endpoint,
            requestBody,
            headers ?? header
        );

        AllureHelper.attachResponse(
            world,
            world.response.status(),
            world.responseBody
        );

        logger.info("API Execution Completed.");
        logger.info("==============================================");
    }
}