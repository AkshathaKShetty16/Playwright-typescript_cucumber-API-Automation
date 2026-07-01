import { APIRequestContext } from '@playwright/test';
import { header } from './header';

const headers = header;

export class ApiClient {


    constructor(private request: APIRequestContext) {}

    async get(url: string) {
        return this.request.get(url, { headers });
    }

    async post(url: string, data: any) {
        return this.request.post(url, {
            headers,
            data
        });
    }

    async put(url: string, data: any) {
        return this.request.put(url, {
            headers,
            data
        });
    }

    async delete(url: string) {
        return this.request.delete(url, {
            headers
        });
    }

}