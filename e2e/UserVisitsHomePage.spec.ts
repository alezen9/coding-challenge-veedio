import { test, expect } from '@playwright/test'

test('User navigates to the homepage and is able to see a list of repositories under the trending tab', async ({ page }) => {
  await page.goto('http://localhost:3000/')
  const selectedTab = page.getByRole('tab', { selected: true })
  expect(await selectedTab.innerText()).toBe('TRENDING')
  
  await page.waitForLoadState('networkidle')

  const repos = page.locator('div[data-test=repo-item]')
  expect(await repos.count()).toBeGreaterThan(0)
})