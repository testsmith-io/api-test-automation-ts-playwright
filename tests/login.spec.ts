import { test, expect } from '@playwright/test';

test('should return access token on successful login', async ({ request }) => {
  const payload = {
    email: 'customer@practicesoftwaretesting.com',
    password: 'welcome01',
  };

  const response = await request.post(`/users/login`, { data: payload });
  expect(response.status()).toBe(200);

  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('access_token');
});