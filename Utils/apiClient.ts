import { APIRequestContext } from '@playwright/test';
import { header } from './header';

export class ApiClient {

    constructor(private request: APIRequestContext) {}

    async get(url: string, headers: Record<string, string> = header) {
        return this.request.get(url, { headers });
    }

    async post(
        url: string,
        data: any,
        headers: Record<string, string> = header
    ) {
        return this.request.post(url, {
            headers,
            data
        });
    }

    async put(
        url: string,
        data: any,
        headers: Record<string, string> = header
    ) {
        return this.request.put(url, {
            headers,
            data
        });
    }

    async delete(
        url: string,
        headers: Record<string, string> = header
    ) {
        return this.request.delete(url, {
            headers
        });
    }

}