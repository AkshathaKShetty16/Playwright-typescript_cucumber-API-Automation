const assert = require('node:assert/strict');
const { Given, When, Then } = require('@cucumber/cucumber');
const { buildPost, buildUpdatedPost } = require('../utils/dataUtil');

// Given — data setup
Given('I have a new post payload', function (this: any) {
    this.data.payload = buildPost();
    this.logger.info('Prepared new post payload', this.data.payload);
});

Given('I have an updated payload for post {string}', function (this: any, id: string) {
    const numericId = Number(id);
    this.data.postId = numericId;
    this.data.payload = buildUpdatedPost(numericId);
    this.logger.info('Prepared updated post payload', this.data.payload);
});

// When — actions (GET / POST / PUT / DELETE)
When('I send a GET request for post {string}', async function (this: any, id: string) {
    const url = this.config.endpoints.postById(id);
    this.logger.info('GET', { url });
    const response = await this.request.get(url);
    await this.setResponse(response, 'GET');
});

When('I send a POST request to create the post', async function (this: any) {
    const url = this.config.endpoints.posts;
    this.logger.info('POST', { url, data: this.data.payload });
    const response = await this.request.post(url, { data: this.data.payload });
    await this.setResponse(response, 'POST');
});

When('I send a PUT request to update the post', async function (this: any) {
    const url = this.config.endpoints.postById(this.data.postId);
    this.logger.info('PUT', { url, data: this.data.payload });
    const response = await this.request.put(url, { data: this.data.payload });
    await this.setResponse(response, 'PUT');
});

When('I send a DELETE request for post {string}', async function (this: any, id: string) {
    const url = this.config.endpoints.postById(id);
    this.logger.info('DELETE', { url });
    const response = await this.request.delete(url);
    await this.setResponse(response, 'DELETE');
});

// Then — assertions
Then('the response status should be {int}', function (this: any, expectedStatus: number) {
    const actual = this.response.status();
    assert.equal(
        actual,
        expectedStatus,
        `Expected status ${expectedStatus} but got ${actual}`,
    );
});

Then(
    'the response body should have field {string} equal to {int}',
    function (this: any, field: string, expected: number) {
        const actual = this.responseBody?.[field];
        assert.equal(actual, expected, `Expected ${field}=${expected} but got ${actual}`);
    },
);

Then('the response body should have a non-empty field {string}', function (this: any, field: string) {
    const value = this.responseBody?.[field];
    assert.ok(
        value !== undefined && value !== null && String(value).length > 0,
        `Expected field "${field}" to be non-empty but got: ${JSON.stringify(value)}`,
    );
});

Then('the response body should echo the sent {string}', function (this: any, field: string) {
    const sent = this.data.payload?.[field];
    const received = this.responseBody?.[field];
    assert.equal(
        received,
        sent,
        `Expected echoed ${field}="${sent}" but got "${received}"`,
    );
});
