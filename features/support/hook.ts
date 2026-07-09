import { Before,After,BeforeAll } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { logger } from '../../Utils/logger';
//import { generateEnvironmentFile } from "../../Utils/environment";



Before(async function (scenario) {

    logger.info("==============================================");
    logger.info(`Worker PID : ${process.pid}`);
    logger.info(`Scenario   : ${scenario.pickle.name}`);
    logger.info("==============================================");
    this.request = await request.newContext();
});

After(async function () {
    await this.request.dispose();
});