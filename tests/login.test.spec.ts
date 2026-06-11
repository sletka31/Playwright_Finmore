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
        const loginPlaceholder = page.getByPlaceholder('your@email.com');
        await expect(loginPlaceholder).toBeVisible();
        await login.fill('admin@demo.com');
        const enterText = page.getByText('Вхід до системи');
        await expect(enterText).toBeVisible();
        const pass = page.getByTestId('login-password-input');
        await expect(pass).toBeVisible();
        const passPlaceholder = page.getByPlaceholder('Введіть пароль');
        await expect(passPlaceholder).toBeVisible();
        await pass.fill('admin123');
        const eyeButton = page.getByTestId('toggle-password-visibility');
        await expect(eyeButton).toBeVisible();

        const submitButton = page.getByRole('button', { name: 'Увійти' });
        await expect(submitButton).toBeVisible();
        await submitButton.click();

        const avatar = page.getByTestId('user-menu-trigger');
        await expect(avatar).toBeVisible();
    });

    test('Password visibility button is displayed', async ({ page }) => {
        await expect(
            page.getByTestId('toggle-password-visibility')
        ).toBeVisible();
    });

    test('Password becomes visible after click', async ({ page }) => {
        const passwordInput = page.getByTestId('login-password-input');
        const eyeButton = page.getByTestId('toggle-password-visibility');

        await expect(passwordInput).toHaveAttribute('type', 'password');

        await eyeButton.click();

        await expect(passwordInput).toHaveAttribute('type', 'text');
    });

    test('Password becomes hidden after second click', async ({ page }) => {
        const passwordInput = page.getByTestId('login-password-input');
        const eyeButton = page.getByTestId('toggle-password-visibility');

        await eyeButton.click();
        await eyeButton.click();

        await expect(passwordInput).toHaveAttribute('type', 'password');
    });


    test('text verification', async ({ page }) => {
        const logoContainer = page.locator('.lucide-log-in').locator('..');
        await expect(logoContainer).toBeVisible();
        await expect(logoContainer).toHaveClass(/bg-green-600/);
        await expect(logoContainer).toHaveClass(/rounded-full/);
        const loginIcon = page.locator('.lucide-log-in');
        await expect(loginIcon).toBeVisible();
        const enterText = page.getByText('Вхід до системи');
        await expect(enterText).toBeVisible();
        const textUnderEnter = page.getByText('Увійдіть до свого облікового запису');
        await expect(textUnderEnter).toBeVisible();
        const textEmail = page.getByText('Email адреса');
        await expect(textEmail).toBeVisible();
        const textPass = page.getByText('Пароль');
        await expect(textPass).toBeVisible();
        const textUnderButtonEnter = page.getByText('Немає облікового запису?');
        await expect(textUnderButtonEnter).toBeVisible();
    })
})