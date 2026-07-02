import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ApiClient } from '../../Utils/apiClient';
import { CustomWorld } from '../support/world';

const baseUrl = process.env.BASE_URL || 'https://jsonplaceholder.typicode.com';

Given('I have valid user data', function (this: CustomWorld) {
  this.data.payload = {
    name: faker.person.firstName(),
    job: faker.person.jobTitle(),
  };
});

When('GET request is made to fetch the user details with the user ID {string}', async function (this: CustomWorld, userId: string) {
  const apiClient = new ApiClient(this.request);
  const response = await apiClient.get(`${baseUrl}/users/${userId}`);

  await this.setResponse(response, 'GET');
  this.response = response;
});

Then('the response status code should be {int}', async function (this: CustomWorld, statusCode: number) {
  expect(this.response.status()).toBe(statusCode);
});

Then('the response body should contain the user details {string}', async function (this: CustomWorld, firstName: string) {
  const responseBody = this.responseBody;
  const actualName = responseBody?.name ?? responseBody?.data?.first_name ?? responseBody?.username;
  expect(actualName).toBe(firstName);
});