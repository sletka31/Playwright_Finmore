import {
    test as base,
    expect,
    APIRequestContext
} from '@playwright/test';
import { PostsClient } from '../api/clients/posts.client';
import { PagesClient } from '../api/clients/pages.client';
import { generateCustom } from '../api/data/posts.data';
export type CreatedPost = {
    id: number;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
    };
    status: string;
};
export type CreatedPage = {
    id: number;
    date: string;
    status: string;
    type: string;
    link: string;
    slug: string;
};
type ApiFixtures = {
    postsClient: PostsClient;
    pagesClient: PagesClient;
    authorizedRequest: APIRequestContext;
    createdPost: CreatedPost;
    createdPage: CreatedPage;
};
export const test = base.extend<ApiFixtures>({
    authorizedRequest: async ({ playwright }, use) => {
        const credentials = Buffer
            .from('admin:Engineer_123')
            .toString('base64');
        const requestContext =
            await playwright.request.newContext({
                baseURL:
                    'https://dev.emeli.in.ua/wp-json/wp/v2/',
                extraHTTPHeaders: {
                    Authorization:
                        `Basic ${credentials}`
                }
            });
        await use(requestContext);
        await requestContext.dispose();
    },
    postsClient:
        async ({ authorizedRequest }, use) => {
        const postsClient =
            new PostsClient(authorizedRequest);
        await use(postsClient);
    },
    pagesClient:
        async ({ authorizedRequest }, use) => {
        const pagesClient =
            new PagesClient(authorizedRequest);
        await use(pagesClient);
    },
    createdPost:
        async ({ postsClient }, use) => {
        const response =
            await postsClient.createPost(
                generateCustom()
            );
        expect(response.status()).toBe(201);
        const post = await response.json();
        await use(post);
        await postsClient.deletePost(post.id);
    },
    createdPage: async ({ pagesClient }, use) => {
       
        const response = await pagesClient.createPage({
            title: 'Тестова сторінка',
            status: 'draft'
        });
        expect(response.status()).toBe(201);
        
        const pageData = await response.json();
        
       
        await use(pageData);
        
       
        await pagesClient.deletePage(pageData.id);
    }

});
export { expect };