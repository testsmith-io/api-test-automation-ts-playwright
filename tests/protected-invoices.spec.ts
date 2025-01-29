import { test, expect } from '@playwright/test';

test.describe('Protected Invoices API', () => {
  let accessToken: string;

  test.beforeAll(async ({ request }) => {
    const loginPayload = {
      email: 'customer@practicesoftwaretesting.com',
      password: 'welcome01',
    };

    const loginResponse = await request.post(`/users/login`, { data: loginPayload });
    expect(loginResponse.status()).toBe(200);

    const loginData = await loginResponse.json();
    accessToken = loginData.access_token;
  });

  test('should retrieve invoices with valid token', async ({ request }) => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await request.get(`/invoices`, { headers });
    expect(response.status()).toBe(200);

    const data = await response.json();
    const invoices = data.data || [];
    expect(invoices.length).toBeGreaterThanOrEqual(15);
  });
});
