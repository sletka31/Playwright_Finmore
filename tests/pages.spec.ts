import { test, expect } from "../fixtures/api.fixture";
test.describe('WordPress API - Тестування динамічних сторінок', () => {

    test('Отримання створеної сторінку за її динамічним ID', async ({ pagesClient, createdPage }) => {
       
        const pageId = createdPage.id;

        const response = await pagesClient.getPageById(pageId);

        expect(response.status()).toBe(200);

        const body = await response.json();

        expect(body.id).toBe(pageId);
        expect(body.type).toBe('page');
        expect(body.status).toBe('draft');
        expect(body.link).toContain(`?page_id=${pageId}`);
    });

});