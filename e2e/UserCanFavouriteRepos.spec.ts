import { test, expect } from '@playwright/test'

test('User navigates to the homepage, favouritesma repo and is able to see it in the Favourites tab', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await page.waitForLoadState('networkidle')

  const repos = page.locator('div[data-test=repo-item]')
  expect(await repos.count()).toBeGreaterThan(0)

  const firstRepo = repos.nth(1)
  const starsBefore = Number(await firstRepo.locator('[data-test=repo-item-stars]').innerText())

  await firstRepo.locator('button[data-test=repo-item-star-button]').click()

  const starsAfter = Number(await firstRepo.locator('[data-test=repo-item-stars]').innerText())

  expect(starsBefore + 1).toBe(starsAfter)

  const favouritesTab = page.locator('button[role=tab]', { hasText: 'FAVOURITES' })
  await favouritesTab.click()

  const favouriteRepos = page.locator('div[data-test=repo-item]')

  expect(await favouriteRepos.count()).toBe(1)
})