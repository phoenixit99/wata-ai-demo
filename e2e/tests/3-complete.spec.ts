import { test, expect } from '@playwright/test';

// Test case: e2e/test-cases/3.md (#3 Đánh dấu công việc đã hoàn thành)

const STORAGE_KEY = 'wata-tasks:v1';

test('TC-3-05 tích hoàn thành rồi tải lại trang thì việc vẫn được tích', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Công việc mới').fill('Viết báo cáo QA');
  await page.getByRole('button', { name: 'Thêm' }).click();
  await page.getByLabel('Công việc mới').fill('Gửi email khách');
  await page.getByRole('button', { name: 'Thêm' }).click();

  const doneBox = page.getByRole('checkbox', { name: 'Hoàn thành: Viết báo cáo QA' });
  const otherBox = page.getByRole('checkbox', { name: 'Hoàn thành: Gửi email khách' });
  await doneBox.check();
  await expect(page.getByText('2 công việc · 1 đã xong')).toBeVisible();

  await page.reload();

  await expect(doneBox).toBeChecked();
  await expect(otherBox).not.toBeChecked();
  await expect(page.getByText('2 công việc · 1 đã xong')).toBeVisible();

  // Kiểu "đã xong" trên trình duyệt thật (jsdom ở unit test không tính CSS): muted + gạch ngang.
  const doneTitle = page.getByRole('listitem').filter({ has: doneBox }).locator('.task-title');
  const otherTitle = page.getByRole('listitem').filter({ has: otherBox }).locator('.task-title');
  const muted = await page.evaluate(() => {
    const probe = document.createElement('span');
    probe.style.color = 'var(--color-muted)';
    document.body.appendChild(probe);
    const color = getComputedStyle(probe).color;
    probe.remove();
    return color;
  });
  await expect(doneTitle).toHaveCSS('color', muted);
  await expect(doneTitle).toHaveCSS('text-decoration-line', 'line-through');
  await expect(otherTitle).not.toHaveCSS('text-decoration-line', 'line-through');
});

test('TC-3-07 dữ liệu cũ không có trường done vẫn hiển thị đủ và đều chưa tích', async ({ page }) => {
  const legacy = [
    { id: 'legacy-1', title: 'Việc cũ một', createdAt: '2026-01-01T08:00:00.000Z' },
    { id: 'legacy-2', title: 'Việc cũ hai', createdAt: '2026-01-02T08:00:00.000Z' },
    { id: 'legacy-3', title: 'Việc cũ ba', createdAt: '2026-01-03T08:00:00.000Z' },
  ];
  await page.addInitScript(
    ([key, value]) => window.localStorage.setItem(key, value),
    [STORAGE_KEY, JSON.stringify(legacy)] as const,
  );

  await page.goto('/');

  await expect(page.getByText('3 công việc · 0 đã xong')).toBeVisible();
  for (const task of legacy) {
    await expect(page.getByRole('checkbox', { name: `Hoàn thành: ${task.title}` })).not.toBeChecked();
  }
  await expect(page.getByRole('listitem')).toHaveCount(legacy.length);
});
