import { test, expect } from '@playwright/test';

test('smoke: thêm và xoá công việc', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Công việc mới').fill('Chuẩn bị demo');
  await page.getByRole('button', { name: 'Thêm' }).click();
  await expect(page.getByText('Chuẩn bị demo')).toBeVisible();
  await page.getByRole('button', { name: 'Xoá "Chuẩn bị demo"' }).click();
  await expect(page.getByText('Chưa có công việc nào')).toBeVisible();
});
