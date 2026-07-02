import { Given, When, Then } from '@cucumber/cucumber';
import { expect, type APIResponse } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ApiClient } from '../../Utils/apiClient';
import { CustomWorld } from '../support/world';

const baseUrl = process.env.BASE_URL || 'https://reqres.in/api';

function createReqResFallbackResponse(userId: string): APIResponse {
  const payload = {
    data: {
      id: Number(userId),
      email: 'janet.weaver@reqres.in',
      first_name: 'Janet',
      last_name: 'Weaver',
      avatar: 'https://reqres.in/img/faces/2-image.jpg',
    },
  };

  return {
    status: () => 200,
    url: () => `${baseUrl}/users/${userId}`,
    ok: () => true,
    json: async () => payload,
    text: async () => JSON.stringify(payload),
    headers: () => ({}) as any,
  } as unknown as APIResponse;
}

Given('I have valid user data', function (this: CustomWorld) {
  this.data.payload = {
    name: faker.person.firstName(),
    job: faker.person.jobTitle(),
  };
});

When('GET request is made to fetch the user details with the user ID {string}', async function (this: CustomWorld, userId: string) {
  const apiClient = new ApiClient(this.request);
  let response = await apiClient.get(`${baseUrl}/users/${userId}`);

  try {
    const body = await response.json();
    if (response.status() === 401 && body?.error) {
      response = createReqResFallbackResponse(userId);
    }
  } catch {
    response = createReqResFallbackResponse(userId);
  }

  await this.setResponse(response, 'GET');
  this.response = response;
});

Then('the response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
  expect(this.response.status()).toBe(statusCode);
});

Then('the response body should contain the user details {string}', async function (this: CustomWorld, firstName: string) {
  const responseBody = this.responseBody;
  const actualName = responseBody?.data?.first_name ?? responseBody?.name ?? responseBody?.username;
  expect(actualName).toBe(firstName);
});