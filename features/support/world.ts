import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import type { APIRequestContext, APIResponse } from '@playwright/test';
import 'allure-cucumberjs';
import * as allure from 'allure-js-commons';

type EndpointConfig = {
    posts: string;
    postById: (id: string | number) => string;
};

export class CustomWorld extends World {
    request!: APIRequestContext;
    response!: APIResponse;
    responseBody: any;
    statusCode = 0;
    data: { payload?: Record<string, unknown>; postId?: number } = {};
    config: { endpoints: EndpointConfig };
    logger = {
        info: (...args: unknown[]) => console.log('[INFO]', ...args),
        warn: (...args: unknown[]) => console.warn('[WARN]', ...args),
        error: (...args: unknown[]) => console.error('[ERROR]', ...args),
    };

    constructor(options: IWorldOptions) {
        super(options);
        this.config = {
            endpoints: {
                posts: 'https://jsonplaceholder.typicode.com/posts',
                postById: (id: string | number) => `https://jsonplaceholder.typicode.com/posts/${id}`,
            },
        };
    }

    async setResponse(response: APIResponse, method = 'GET') {
        this.response = response;
        this.statusCode = response.status();

        try {
            this.responseBody = await response.json();
        } catch {
            this.responseBody = await response.text();
        }

        await allure.step(`Capture response ${this.statusCode}`, async () => {
            await allure.attachment(
                'request-summary',
                JSON.stringify(
                    {
                        url: response.url(),
                        method,
                        status: this.statusCode,
                        payload: this.data.payload ?? null,
                    },
                    null,
                    2,
                ),
                { contentType: 'application/json' },
            );
            await allure.attachment(
                'request-body',
                typeof this.data.payload === 'undefined'
                    ? ''
                    : JSON.stringify(this.data.payload, null, 2),
                { contentType: 'application/json' },
            );
            await allure.attachment(
                'response-body',
                typeof this.responseBody === 'string'
                    ? this.responseBody
                    : JSON.stringify(this.responseBody, null, 2),
                { contentType: 'application/json' },
            );
        });
    }
}

setWorldConstructor(CustomWorld);
