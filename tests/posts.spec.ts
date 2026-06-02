import { test, expect } from '@playwright/test';
import { PostsClient } from '../api/clients/posts.client';
import { generateCustom } from '../api/data/posts.data';

test.describe('WordPress Posts API (Senior Framework)', () => {

    let postsClient: PostsClient;

    test.beforeEach(async ({ request }) => {
        postsClient = new PostsClient(request);
    });

    test('CREATE post', async () => {
        const data = generateCustom();

        const response = await postsClient.createPost(data);

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body.title.rendered).toBe(data.title);
        expect(body.status).toBe('publish');
        console.log(data);
    });

    test('GET all posts', async () => {
        const response = await postsClient.getAllPosts();

        expect(response.ok()).toBeTruthy();

        const posts = await response.json();

        expect(Array.isArray(posts)).toBe(true);
    });

    test('GET post by ID', async () => {
        const response = await postsClient.getPostById(1);

        expect(response.ok()).toBeTruthy();

        const post = await response.json();

        expect(post).toHaveProperty('id');
    });

    test('UPDATE post', async () => {
        const created = await postsClient.createPost(generateCustom());
        const post = await created.json();

        const updated = await postsClient.updatePost(post.id, {
            title: 'Updated title',
            content: 'Updated content'
        });

        const body = await updated.json();

        expect(body.title.rendered).toBe('Updated title');
    });

    test('DELETE post', async () => {
        const created = await postsClient.createPost(generateCustom());
        const post = await created.json();

        const response = await postsClient.deletePost(post.id);

        expect(response.ok()).toBeTruthy();
    });
});