import { test, expect, Page, Locator } from '@playwright/test';
export class RegisterPage {
    readonly page: Page;
    readonly registerButton: Locator;
    readonly name: Locator;
    readonly namePlaceholder: Locator;
    readonly email: Locator;
    readonly emailPlaceholder: Locator;
    readonly pass: Locator;
    readonly passConfirm: Locator;
    readonly passPlaceholder: Locator;
    readonly passConfirmPlaceholder: Locator;
    readonly currencySelect: Locator;
    readonly confirmRegisterButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.registerButton = page.getByTestId('switch-to-register-button');
        this.name = page.getByTestId('register-name-input');
        this.namePlaceholder = page.getByPlaceholder('Іван Петренко');
        this.email = page.getByTestId('register-email-input');
        this.emailPlaceholder = page.getByPlaceholder('your@email.com')
        this.pass = page.getByTestId('register-password-input');
        this.passPlaceholder = page.getByPlaceholder('Мінімум 6 символів')
        this.passConfirm = page.getByTestId('register-confirm-password-input');
        this.passConfirmPlaceholder = page.getByPlaceholder('Повторіть пароль');
        this.currencySelect = page.getByTestId('register-currency-select');
        this.confirmRegisterButton = page.getByRole('button', { name: 'Зареєструватися' });

    }
    async openSite() {
        await this.page.goto('/');
    };

    async clickButtonRegister() {
        await this.registerButton.click();
    }
    
    async checkRegister(name: string, pass: string, email: string, passConfirm: string, currency: string) {

        await this.name.fill(name);
        await this.email.fill(email);
        await this.pass.fill(pass);
        await this.passConfirm.fill(passConfirm);
        await this.currencySelect.selectOption(currency);
        await this.confirmRegisterButton.click();

    }
    /*async checkRegisterButton() {
        await expect(this.registerButton).toBeVisible();
        await this.registerButton.click();
    };

    async enteringName(name: string) {
        await expect(this.name).toBeVisible();
        await expect(this.namePlaceholder).toBeVisible();
        await this.name.fill(name);
    };

    async enteringEmail(email: string) {
        await expect(this.email).toBeVisible();
        await expect(this.emailPlaceholder).toBeVisible();
        await this.email.fill(email);
    };

    async enteringPass(pass: string) {
        await expect(this.pass).toBeVisible();
        await expect(this.passPlaceholder).toBeVisible();
        await this.pass.fill(pass);
    };

    async enteringConfirmPass(passConfirm: string) {
        await expect(this.passConfirm).toBeVisible();
        await expect(this.passConfirmPlaceholder).toBeVisible();
        await this.passConfirm.fill(passConfirm);
    };

    async selectCurrency(currency: string) {
        await expect(this.currencySelect).toBeVisible();
        await this.currencySelect.selectOption(currency);
        await expect(this.currencySelect).toHaveValue(currency);

    }*/


}