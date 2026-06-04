import { test as base } from '@playwright/test';
import { PostsClient } from '../api/clients/posts.client';
 
type ApiFixtures = {
    postsClient: PostsClient;
};
 
export const test = base.extend<ApiFixtures>({
    postsClient: async ({ request }, use) => {
 
        const postsClient = new PostsClient(request);
 
        await use(postsClient);
 
    }
});
 
export { expect } from '@playwright/test';