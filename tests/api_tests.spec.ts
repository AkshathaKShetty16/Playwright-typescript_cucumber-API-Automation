import { test, expect, APIResponse } from '@playwright/test';
import dotenv from 'dotenv';
import { header } from '../Utils/header';
import { userData } from '../testData/dataUtils';
import { ApiClient } from '../Utils/apiClient';
import type { GetUser } from '../Models/getUser';
import type { CreateUser } from '../Models/createUser';
import type { UpdateUser } from '../Models/updateUser';

dotenv.config();

const headers = header;


test('GET API REQUEST', async ({ request }) => {
    const apiClient = new ApiClient(request);

    const response: APIResponse = await apiClient.get(`${process.env.BASE_URL}/users/2`);

    expect(response.status()).toBe(200);

    const responseBody: GetUser = await response.json();

    expect(responseBody.data.first_name).toBe('Janet');

    console.log('Response Body:', responseBody);
});


test('POST API REQUEST', async ({ request }) => {
    const apiClient = new ApiClient(request);

    const response: APIResponse = await apiClient.post(
        `${process.env.BASE_URL}/users`,
        userData.createUser
    );

    expect(response.status()).toBe(201);

    const responseBody: CreateUser = await response.json();

    expect(responseBody.name).toBe('Akshatha');
    expect(responseBody.job).toBe('SDET');

    // Optional chaining because _meta may not exist
    expect(responseBody._meta?.cta?.label).toBe('Get started');

    console.log('Response Body:', responseBody);
});

test('PUT API REQUEST', async ({ request }) => {

    const apiClient = new ApiClient(request);

    const response: APIResponse = await apiClient.put(
        `${process.env.BASE_URL}/users/2`,
        userData.updateUser
    );

    expect(response.status()).toBe(200);

    const responseBody: UpdateUser = await response.json();

    expect(responseBody.name).toContain('Akshatha_');

    console.log('Response Body:', responseBody);
});

test('DELETE API REQUEST', async ({ request }) => {
    const apiClient = new ApiClient(request);

    const response: APIResponse = await apiClient.delete(
        `${process.env.BASE_URL}/users/2`
    );

    expect(response.status()).toBe(204);
});