import {
    test as base,
    expect,
    APIRequestContext
} from '@playwright/test';
import { PostsClient } from '../api/clients/posts.client';
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
type ApiFixtures = {
    postsClient: PostsClient;
    authorizedRequest: APIRequestContext;
    createdPost: CreatedPost;
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
    }
});
export { expect };