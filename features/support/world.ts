import { APIRequestContext, APIResponse } from '@playwright/test';

export class CustomWorld {
    request!: APIRequestContext;
    response!: APIResponse;
    responseBody: any;
    statusCode!: number;
}

//export const world = new CustomWorld();