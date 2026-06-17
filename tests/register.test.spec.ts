import { test, expect, Page } from '@playwright/test';
test.describe('tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveURL('/');
        await expect(page).toHaveTitle('Повнофункціональний фінансовий менеджер')
    });

    test('registration', async ({ page }) => {
        const singUp = page.getByRole('button', { name: 'Зареєструватися' });
        await expect(singUp).toBeVisible();
        await singUp.click();

        const textPageRegister = page.getByTestId('register-page');
        await expect(textPageRegister).toBeVisible();

        const textRegister = page.getByText('Реєстрація');
        await expect(textRegister).toBeVisible();
        const textUnderRegister = page.getByText('Створіть новий обліковий запис');
        await expect(textUnderRegister).toBeVisible();

        const textName = page.getByText("Повне ім'я");
        await expect(textName).toBeVisible();

        const namePlaceholder = page.getByPlaceholder('Іван Петренко');
        await expect(namePlaceholder).toBeVisible();

        const name = page.getByTestId('register-name-input');
        await expect(name).toBeVisible();
        await name.fill('Іванна Петренко');

        const emailText = page.getByText('Email адреса');
        await expect(emailText).toBeVisible();

        const email = page.getByTestId('register-email-input');
        await expect(email).toBeVisible();
        await email.fill('your123@google.com');

        const emailPlaceholder = page.getByPlaceholder('your@email.com');
        await expect(emailPlaceholder).toBeVisible();

        const pass = page.getByTestId('register-password-input');
        await expect(pass).toBeVisible();
        await pass.fill('Test123');

        const passPlaceholder = page.getByPlaceholder('Мінімум 6 символів');
        await expect(passPlaceholder).toBeVisible();

        const passConfirm = page.getByTestId('register-confirm-password-input');
        await expect(passConfirm).toBeVisible();
        await passConfirm.fill('Test123');

        const currency = page.getByTestId('register-currency-select');
        await expect(currency).toBeVisible();
        await currency.selectOption({ label: 'Гривня (UAH)' });
        await expect(currency).toHaveValue('UAH');

        const confirmRegisterButton = page.getByRole('button', { name: 'Зареєструватися' });
        await expect(confirmRegisterButton).toBeVisible();
        await confirmRegisterButton.click();

    });

    test('return to the login page', async ({ page }) => {
        const singUp = page.getByRole('button', { name: 'Зареєструватися' });
        await expect(singUp).toBeVisible();
        await singUp.click();

        const buttonToLogin = page.getByTestId('switch-to-login-button');
        await expect(buttonToLogin).toBeVisible();
        await buttonToLogin.click();
        await expect(page).toHaveURL('/');
    })
})