import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ApiClient } from '../../Utils/apiClient';
import { CustomWorld } from '../support/world';
import { userData } from '../../testData/dataUtils';
import { AllureHelper } from "../../Utils/allurehelper";
import { ApiExecutor } from "../../Utils/apiExecutor";
import { header } from "../../Utils/header";



Given('the user ID {string} exists', async function (userId: string) {
  this.userId = userId;
});

Given('the request authentication is {string}', async function (auth: string) {

  switch (auth.toLowerCase()) {

    case "valid":
      this.headers = header;
      break;

    case "missing":
      this.headers = {};
      break;

    case "invalid":
      this.headers = {
        "x-api-key": "123456789"
      };
      break;

    default:
      throw new Error(`Unknown authentication type: ${auth}`);
  }

});

When(
  'a GET request is made to fetch the user details',
  async function () {

    await ApiExecutor.execute(
      this,
      "GET",
      `${process.env.BASE_URL}/${this.userId}`,
      undefined,
      this.headers
    );

  });


Then('the response status code should be {int}', async function (this: any, statusCode: number) {
  // Write code here that turns the phrase above into concrete actions
  expect(this.response.status()).toBe(statusCode);
});

Then('the response body should contain the user details {string}', async function (this: any, firstName: string) {
  const responseBody = await this.response.json();
  expect(responseBody.data.first_name).toBe(firstName);
  //console.log(responseBody);
});


Given('the user has the create user payload', function () {
  this.requestBody = userData.createUser();
});

When('POST request is made to create the user with endpoint {string} with payload',
  async function (endpoint: string) {

    await ApiExecutor.execute(
      this,
      "POST",
      `${process.env.BASE_URL}${endpoint}`,
      this.requestBody,
      this.headers
    );

  });


Then('the response should contain the created user details', async function () {
  expect(this.responseBody.name).toBe(this.requestBody.name);
  expect(this.responseBody.job).toBe(this.requestBody.job);
  expect(this.responseBody._meta?.cta?.label).toBe('Get started');
  //console.log(this.responseBody);
});



When(
  'PUT request is made to update the existing data',
  async function () {

    this.requestBody = userData.updateUser();

    await ApiExecutor.execute(
      this,
      "PUT",
      `${process.env.BASE_URL}/${this.userId}`,
      this.requestBody,
      this.headers
    );

  }
);

Then('the response should contain the updated user data', function () {
  expect(this.responseBody.name).toContain(this.requestBody.name);
  //console.log(this.responseBody);
});


When(
  'DELETE request is made to the user deletion endpoint',
  async function () {

    await ApiExecutor.execute(
      this,
      "DELETE",
      `${process.env.BASE_URL}/${this.userId}`,
      undefined,
      this.headers
    );

  }
);


