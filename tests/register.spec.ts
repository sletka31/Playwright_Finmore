import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { RandomDataGenerator } from '../api/utils/general.data.generate';

test.describe('Register user', () => {

    let loginPage: LoginPage;
    let registerPage: RegisterPage;
    const email = RandomDataGenerator.randomEmail();
    const firstName = RandomDataGenerator.randomFirstName();
    const lastName = RandomDataGenerator.randomLastName();

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        registerPage = new RegisterPage(page);
        await loginPage.openSite();
        await loginPage.checkTitle();
        await loginPage.checkUrl();
        await registerPage.clickButtonRegister();

    })

    test('Реєстрація нового юзера', async () => {

        await registerPage.checkRegister(`${firstName} ${lastName}`, email, '123456', '123456', 'UAH');

    })
})