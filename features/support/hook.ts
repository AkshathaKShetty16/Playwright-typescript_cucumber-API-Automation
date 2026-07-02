import { Before,After } from '@cucumber/cucumber';
import { request } from '@playwright/test';

Before(async function () {
    this.request = await request.newContext();
});

After(async function () {
    await this.request.dispose();
});