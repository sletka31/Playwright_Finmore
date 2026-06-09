import { APIRequestContext } from '@playwright/test';

export class PagesClient {
    constructor(private request: APIRequestContext) {}

    async createPage(data: object) {
        return await this.request.post('pages', { data });
    }

    async getPageById(id: number) {
        return await this.request.get(`pages/${id}`);
    }

    async deletePage(id: number) {
        return await this.request.delete(`pages/${id}`, {
            params: { force: true }
        });
    }
}