import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ApiClient } from '../../Utils/apiClient';
import { CustomWorld } from '../support/world';



Given('I have valid user data', function () {
  // Write code here that turns the phrase above into concrete actions
});

When('GET request is made to fetch the user details with the user ID {string}', async function (this: any, userId: string) {
  const apiClient = new ApiClient(this.request);
  this.response = await apiClient.get(`${process.env.BASE_URL}/users/${userId}`);
});


Then('the response status code should be {int}', async function (this: any, statusCode: number) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.status()).toBe(statusCode);
});

Then('the response body should contain the user details {string}', async function (this: any, firstName: string) {
  // Write code here that turns the phrase above into concrete actions
  const responseBody = await this.response.json();
  expect(responseBody.data.first_name).toBe(firstName);
});