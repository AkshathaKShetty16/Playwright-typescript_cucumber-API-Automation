import { test, expect } from '@playwright/test';

test('GET API REQUEST', async ({ request }) => {

    const response = await request.get('https://reqres.in/api/users/2', {
        headers: {
            'x-api-key': 'pro_fafa16755c89ee2288ecc99d4e600a0f23efea710fa020d402c43c0d1ae77777'
        }
    });

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.data.first_name).toBe('Janet');

    console.log("Response Body: ", responseBody);


})
//use test.only to run only this test case and skip all other test cases
test('POST API REQUEST', async ({ request }) => {

    const response = await request.post('https://reqres.in/api/users', {
        headers: {
            'x-api-key': 'pro_fafa16755c89ee2288ecc99d4e600a0f23efea710fa020d402c43c0d1ae77777'
        },
        data: {
            "name": "Akshatha",
            "job": "SDET"
        }
    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    expect(responseBody.name).toBe('Akshatha');
    expect(responseBody.job).toBe('SDET');
    expect(responseBody._meta.cta.label).toBe('Get started');
    console.log("Response Body: ", responseBody);
})

test('PUT API REQUEST', async ({ request }) => {
    const now = new Date();
    const uniqueName = `Akshatha_${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

    const response = await request.put('https://reqres.in/api/users/2', {
        headers: {
            'x-api-key': 'pro_fafa16755c89ee2288ecc99d4e600a0f23efea710fa020d402c43c0d1ae77777'
        },
        data: {
            "name": uniqueName,
            "job": "SDET"
        }
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    expect(responseBody.name).toContain('Akshatha_');

})

test('DELETE API REQUEST', async ({ request }) => {

    const response = await request.delete('https://reqres.in/api/users/2', {
        headers: {
            'x-api-key': 'pro_fafa16755c89ee2288ecc99d4e600a0f23efea710fa020d402c43c0d1ae77777'
        }
    });

    expect(response.status()).toBe(204);


})

