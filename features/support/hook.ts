import { Before, After } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { logger } from '../../Utils/logger';
import '../../config/environment';
import { Config } from '../../config/config';

Before(async function (scenario) {

    logger.info("==============================================");
    logger.info(`Environment: ${Config.environment}`);
    logger.info(`Base URL   : ${Config.baseUrl}`);
    logger.info(`Worker PID : ${process.pid}`);
    logger.info(`Scenario   : ${scenario.pickle.name}`);
    logger.info("==============================================");

    this.request = await request.newContext({
        baseURL: Config.baseUrl
    });
});

After(async function () {
    await this.request.dispose();
});

logger.info(`Config BaseURL : ${Config.baseUrl}`);
logger.info(`Process BaseURL: ${process.env.BASE_URL}`);