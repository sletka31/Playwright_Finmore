import { test, expect }
    from '../fixtures/api.fixture';

import { generateCustom }
    from '../api/data/posts.data';

test.describe('WordPress Posts API', () => {

    test('CREATE post',
        async ({ postsClient }) => {

        const data = generateCustom();

        const response =
            await postsClient.createPost(data);

        expect(response.status()).toBe(201);

        const body = await response.json();

        expect(body.title.rendered)
            .toBe(data.title);

        expect(body.status)
            .toBe('publish');

    });

    test('GET all posts',
        async ({ postsClient }) => {

        const response =
            await postsClient.getAllPosts();

        expect(response.ok()).toBeTruthy();

        const posts = await response.json();

        expect(Array.isArray(posts))
            .toBe(true);

    });

    test('GET post by ID',
        async ({
            postsClient,
            createdPost
        }) => {

        const response =
            await postsClient.getPostById(
                createdPost.id
            );

        expect(response.ok()).toBeTruthy();

        const post = await response.json();

        expect(post.id)
            .toBe(createdPost.id);

    });

    test('UPDATE post',
        async ({
            postsClient,
            createdPost
        }) => {

        const response =
            await postsClient.updatePost(
                createdPost.id,
                {
                    title: 'Updated title',
                    content: 'Updated content'
                }
            );

        expect(response.ok()).toBeTruthy();

        const body = await response.json();

        expect(body.title.rendered)
            .toBe('Updated title');

    });

    test('DELETE post',
        async ({ postsClient }) => {

        const created =
            await postsClient.createPost(
                generateCustom()
            );

        const post = await created.json();

        const response =
            await postsClient.deletePost(
                post.id
            );

        expect(response.ok())
            .toBeTruthy();

    });

});