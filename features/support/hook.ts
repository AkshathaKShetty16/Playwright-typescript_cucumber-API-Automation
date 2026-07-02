import { After, Before, Status } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { CustomWorld } from './world';

Before(async function (this: CustomWorld, scenario) {
    this.request = await request.newContext();
    await allure.epic('API Automation');
    await allure.feature('JSONPlaceholder CRUD');
    await allure.story(scenario.pickle.name);
});

After(async function (this: CustomWorld, scenario) {
    try {
        if (scenario.result?.status === Status.FAILED) {
            const failureDetails = this.responseBody ?? { status: this.statusCode };
            await allure.attachment(
                'failure-details',
                JSON.stringify(failureDetails, null, 2),
                { contentType: 'application/json' },
            );
        }
    } finally {
        await this.request?.dispose();
    }
});