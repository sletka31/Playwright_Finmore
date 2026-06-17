
import { test, expect, Page, Locator } from '@playwright/test';
export class LoginPage {

    readonly page: Page;
    readonly avatar: Locator;
    readonly login: Locator;
    readonly pass: Locator;
    readonly submit: Locator;

    constructor(page: Page) {

        this.page = page;
        this.avatar = page.getByTestId('user-menu-trigger');
        this.login = page.getByTestId('login-email-input');
        this.pass = page.getByTestId('login-password-input');
        this.submit = page.getByRole('button', { name: 'Увійти' });
    };

    async openSite() {
        await this.page.goto('/');
    };

    async checkTitle() {
        await expect(this.page).toHaveTitle('Повнофункціональний фінансовий менеджер');
    };

    async checkUrl () {
        await expect(this.page).toHaveURL('/');
    }

    async authorization(login: string, pass: string) {
        await this.login.fill(login);
        await this.pass.fill(pass);
        await this.submit.click();
    }
}

