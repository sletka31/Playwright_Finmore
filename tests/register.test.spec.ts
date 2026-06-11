import { test, expect, Page } from '@playwright/test';
test.describe('tests', () => {
    test.beforeEach(async ({ page }) => { 
        await page.goto('/');
        await expect(page).toHaveURL('/');
        await expect(page).toHaveTitle('Повнофункціональний фінансовий менеджер')
    });

    test ('registration', async ({page}) => {
        const singUp = page.getByRole('button', {name: 'Зареєструватися'});
        await expect(singUp).toBeVisible();
        await singUp.click();
       
         const textPageRegister = page.getByTestId('register-page');
        await expect(textPageRegister).toBeVisible();

        const textRegister = page.getByText('Реєстрація');
        await expect(textRegister).toBeVisible();
        const textUnderRegister = page.getByText('Створіть новий обліковий запис');
        await expect(textUnderRegister).toBeVisible();
    });


})