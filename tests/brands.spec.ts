import { test, expect } from '@playwright/test';

test('should retrieve at least two brands', async ({ request }) => {
  const response = await request.get(`/brands`);
  expect(response.status()).toBe(200);

  const data = await response.json();
  expect(data.length).toBeGreaterThanOrEqual(2);
});