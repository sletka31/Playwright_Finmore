import { test, expect, Page } from '@playwright/test';
test.describe('tests', () => {
    test.beforeEach(async ({ page }) => { 
        await page.goto('/');
        await expect(page).toHaveURL('/');
        await expect(page).toHaveTitle('Повнофункціональний фінансовий менеджер')
    });

    test('authorization', async ({ page }) => {
        const login = page.getByTestId('login-email-input');
        await expect(login).toBeVisible();
        await login.fill('admin@demo.com');

        const pass=page.getByAltText('login-password-input');
        await expect(pass).toBeVisible();
        await pass.fill('admin123');

        
    })
})
