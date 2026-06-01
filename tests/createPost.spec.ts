import { test, expect } from '@playwright/test';
import { DataGenerator } from '../api/utils/datagenerate';

const BASE_URL = 'https://dev.emeli.in.ua/wp-json/wp/v2';

const POSTS_ENDPOINT = `${BASE_URL}/posts`;


const AUTH = {

    username: 'admin',

    password: 'Engineer_123'

};


const getAuthHeaders = () => ({

    'Authorization': `Basic ${Buffer.from(`${AUTH.username}:${AUTH.password}`).toString('base64')}`,

    'Content-Type': 'application/json'

});

test.describe('WordPress Posts API - CRUD Tests', () => {

    let createdPostId: number;

    test.beforeAll(async () => {

        // Перевірка доступності API

        console.log('Testing API endpoint:', POSTS_ENDPOINT);

    });

    test('CREATE - Should create a new post', async ({ request }) => {

        const postData = {

            title: DataGenerator.generatePostTitle(),

            content: DataGenerator.generatePostContent(),

            status: 'publish',

            excerpt: DataGenerator.generatePostExcerpt()

        };

        const response = await request.post(POSTS_ENDPOINT, {

            headers: getAuthHeaders(),

            data: postData

        });

        expect(response.ok()).toBeTruthy();

        expect(response.status()).toBe(201);

        const responseBody = await response.json();

        createdPostId = responseBody.id;

        expect(responseBody).toHaveProperty('id');

        expect(typeof responseBody.id).toBe('number');
        expect(responseBody.id).not.toBe('');

        const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

        expect(responseBody.date).toMatch(isoRegex);
        expect(typeof responseBody.date).toBe('string');

        const urlRegex = /^https:\/\/[a-z0-9.-]+\.[a-z]{2,}(\/.*)?$/i;

        expect(responseBody.guid.rendered).toMatch(urlRegex);
        expect(typeof responseBody.guid.rendered).toBe('string');

        expect(responseBody.password).toBe('');
        expect(typeof responseBody.password).toBe('string');
        expect(responseBody.content.protected).toBe(false);
        expect(typeof responseBody.content.protected).toBe('boolean');

        expect(responseBody.title.rendered).toBe(postData.title);
        expect(typeof responseBody.title.rendered).toBe('string');

        expect(responseBody.status).toBe('publish');
        expect(typeof responseBody.status).toBe('string');

        expect(responseBody.type).toBe('post');
        expect(typeof responseBody.type).toBe('string');

        expect(responseBody.excerpt.rendered).toContain(postData.excerpt);
        expect(typeof responseBody.excerpt.rendered).toBe('string');

        expect(responseBody.content.rendered).toContain(postData.content);
        expect(typeof responseBody.content.rendered).toBe('string');
        expect(responseBody.content.raw).toBe(postData.content);
        expect(typeof responseBody.content.raw).toBe('string');
        expect(responseBody.content.protected).toBe(false);
        expect(typeof responseBody.content.protected).toBe('boolean');

        expect(responseBody.author).toBe(1);
        expect(typeof responseBody.author).toBe('number');

        expect(responseBody.format).toBe('standard');
        expect(typeof responseBody.format).toBe('string');

        expect(responseBody.categories).toEqual([1]);
        expect(Array.isArray(responseBody.categories)).toBe(true);

        expect(responseBody.categories).toHaveLength(1);

        expect(Array.isArray(responseBody.class_list)).toBe(true);

        const classes = responseBody.class_list;

        expect(classes).toEqual(
            expect.arrayContaining([
                expect.stringMatching(/^post-\d+$/),
                'post',
                'type-post',
                'status-publish',
                'format-standard',
                'hentry',
                'category-news'
            ])

        );

        console.log(postData.title);
        console.log(postData.content);
        console.log(postData.excerpt);
        console.log('Created post ID:', createdPostId);

    });

    test('READ - Should get all posts', async ({ request }) => {

        const response = await request.get(POSTS_ENDPOINT);

        expect(response.ok()).toBeTruthy();

        expect(response.status()).toBe(200);

        const posts = await response.json();

        expect(Array.isArray(posts)).toBeTruthy();

        expect(posts.length).toBeGreaterThan(0);

        // Перевірка структури першого поста

        const firstPost = posts[0];

        expect(firstPost).toHaveProperty('id');

        expect(firstPost).toHaveProperty('title');

        expect(firstPost).toHaveProperty('content');

    });

    test('READ - Should get a specific post by ID', async ({ request }) => {

        // Використовуємо ID створеного поста або тестовий ID

        const testPostId = createdPostId;

        const response = await request.get(`${POSTS_ENDPOINT}/${testPostId}`);

        //expect(response.ok()).toBeTruthy();

        expect(response.status()).toBe(200);

        const post = await response.json();

        expect(post.id).toBe(testPostId);

        expect(post).toHaveProperty('title');

        expect(post).toHaveProperty('content');

        expect(post).toHaveProperty('date');

    });

    test('UPDATE - Should update an existing post', async ({ request }) => {

        test.skip(!createdPostId, 'No post created to update');

        const updateData = {

            title: 'Updated Test Post',

            content: 'This content has been updated via API',

            excerpt: 'Updated excerpt'

        };

        const response = await request.put(`${POSTS_ENDPOINT}/${createdPostId}`, {

            headers: getAuthHeaders(),

            data: updateData

        });

        expect(response.ok()).toBeTruthy();

        expect(response.status()).toBe(200);

        const updatedPost = await response.json();

        expect(updatedPost.id).toBe(createdPostId);

        expect(updatedPost.title.rendered).toBe(updateData.title);

        expect(updatedPost.content.rendered).toContain('updated');

    });

    test('PATCH - Should partially update a post', async ({ request }) => {

        test.skip(!createdPostId, 'No post created to patch');

        const patchData = {

            title: 'Patched Title Only'

        };

        const response = await request.patch(`${POSTS_ENDPOINT}/${createdPostId}`, {

            headers: getAuthHeaders(),

            data: patchData

        });

        expect(response.ok()).toBeTruthy();

        const patchedPost = await response.json();

        expect(patchedPost.title.rendered).toBe(patchData.title);

    });

    test('DELETE - Should delete a post', async ({ request }) => {

        test.skip(!createdPostId, 'No post created to delete');

        const response = await request.delete(`${POSTS_ENDPOINT}/${createdPostId}`, {

            headers: getAuthHeaders()

        });

        expect(response.ok()).toBeTruthy();

        expect(response.status()).toBe(200);

        const deletedPost = await response.json();

        // Перевірка, що пост дійсно видалено

        const getResponse = await request.get(`${POSTS_ENDPOINT}/${createdPostId}`);

        expect(getResponse.status()).toBe(404);

    });

    test('Error Handling - Should return 404 for non-existent post', async ({ request }) => {

        const response = await request.get(`${POSTS_ENDPOINT}/999999`);

        expect(response.status()).toBe(404);

        const errorBody = await response.json();

        expect(errorBody).toHaveProperty('code');

    });

    test('Error Handling - Should return 401 for unauthorized create', async ({ request }) => {

        const postData = {

            title: 'Unauthorized Post',

            content: 'This should fail',

            status: 'publish'

        };

        const response = await request.post(POSTS_ENDPOINT, {

            data: postData

        });

        expect(response.status()).toBe(401);

    });

    test('Filtering - Should filter posts by status', async ({ request }) => {

        const response = await request.get(`${POSTS_ENDPOINT}?status=publish`);

        expect(response.ok()).toBeTruthy();

        const posts = await response.json();

        posts.forEach((post: any) => {

            expect(post.status).toBe('publish');

        });

    });

    test('Pagination - Should respect per_page parameter', async ({ request }) => {

        const perPage = 5;

        const response = await request.get(`${POSTS_ENDPOINT}?per_page=${perPage}`);

        expect(response.ok()).toBeTruthy();

        const posts = await response.json();

        expect(posts.length).toBeLessThanOrEqual(perPage);

    });

});

test.describe('WordPress Posts API - Validation Tests', () => {

    test('Should validate required fields', async ({ request }) => {

        const invalidData = {

            // Відсутній обов'язковий title

            content: 'Content without title'

        };

        const response = await request.post(POSTS_ENDPOINT, {

            headers: getAuthHeaders(),

            data: invalidData

        });


        const body = await response.json();

        console.log('Validation response:', body);

    });

    test('Should handle special characters in title', async ({ request }) => {

        const specialCharsData = {

            title: 'Test with  & symbols <>"',

            content: 'Testing special characters',

            status: 'draft'

        };

        const response = await request.post(POSTS_ENDPOINT, {

            headers: getAuthHeaders(),

            data: specialCharsData

        });

        expect(response.ok()).toBeTruthy();

        const post = await response.json();

        //expect(post.title.rendered).toContain('特殊字符');

        // Cleanup

        await request.delete(`${POSTS_ENDPOINT}/${post.id}`, {

            headers: getAuthHeaders()

        });

    });

});

test.describe('WordPress Posts API - Performance Tests', () => {

    test('GET all posts - should respond within acceptable time', async ({ request }) => {

        const startTime = Date.now();

        const response = await request.get(POSTS_ENDPOINT);

        const endTime = Date.now();

        const responseTime = endTime - startTime;

        expect(response.ok()).toBeTruthy();

        console.log(`GET all posts response time: ${responseTime}ms`);

        // Перевірка, що запит виконується швидше 2 секунд

        expect(responseTime).toBeLessThan(2000);

        if (responseTime > 1000) {

            console.warn(` Warning: Response time ${responseTime}ms exceeds 1 second`);

        }

    });

    test('GET single post - should respond within acceptable time', async ({ request }) => {

        const startTime = Date.now();

        const response = await request.get(`${POSTS_ENDPOINT}/1`);

        const endTime = Date.now();

        const responseTime = endTime - startTime;

        console.log(`GET single post response time: ${responseTime}ms`);

        expect(responseTime).toBeLessThan(1500);

        if (responseTime > 800) {

            console.warn(` Warning: Single post response time ${responseTime}ms exceeds 800ms`);

        }

    });

    test('POST create post - should respond within acceptable time', async ({ request }) => {

        const postData = {

            title: 'Performance Test Post',

            content: 'Testing POST request speed',

            status: 'draft'

        };

        const startTime = Date.now();

        const response = await request.post(POSTS_ENDPOINT, {

            headers: getAuthHeaders(),

            data: postData

        });

        const endTime = Date.now();

        const responseTime = endTime - startTime;

        expect(response.ok()).toBeTruthy();

        console.log(`POST create post response time: ${responseTime}ms`);

        expect(responseTime).toBeLessThan(3000);

        // Cleanup

        const post = await response.json();

        await request.delete(`${POSTS_ENDPOINT}/${post.id}`, {

            headers: getAuthHeaders()

        });

    });

    test('PUT update post - should respond within acceptable time', async ({ request }) => {

        // Спочатку створюємо пост

        const createResponse = await request.post(POSTS_ENDPOINT, {

            headers: getAuthHeaders(),

            data: {

                title: 'Post to Update',

                content: 'Initial content',

                status: 'draft'

            }

        });

        const post = await createResponse.json();

        const postId = post.id;

        // Тестуємо швидкість оновлення

        const updateData = {

            title: 'Updated Title',

            content: 'Updated content'

        };

        const startTime = Date.now();

        const response = await request.put(`${POSTS_ENDPOINT}/${postId}`, {

            headers: getAuthHeaders(),

            data: updateData

        });

        const endTime = Date.now();

        const responseTime = endTime - startTime;

        expect(response.ok()).toBeTruthy();

        console.log(`PUT update post response time: ${responseTime}ms`);

        expect(responseTime).toBeLessThan(3000);

        // Cleanup

        await request.delete(`${POSTS_ENDPOINT}/${postId}`, {

            headers: getAuthHeaders()

        });

    });

    test('DELETE post - should respond within acceptable time', async ({ request }) => {

        // Створюємо пост для видалення

        const createResponse = await request.post(POSTS_ENDPOINT, {

            headers: getAuthHeaders(),

            data: {

                title: 'Post to Delete',

                content: 'Will be deleted',

                status: 'draft'

            }

        });

        const post = await createResponse.json();

        const postId = post.id;

        // Тестуємо швидкість видалення

        const startTime = Date.now();

        const response = await request.delete(`${POSTS_ENDPOINT}/${postId}`, {

            headers: getAuthHeaders()

        });

        const endTime = Date.now();

        const responseTime = endTime - startTime;

        expect(response.ok()).toBeTruthy();

        console.log(`DELETE post response time: ${responseTime}ms`);

        expect(responseTime).toBeLessThan(2000);

    });

    test('Multiple concurrent GET requests - average response time', async ({ request }) => {

        const numberOfRequests = 5;

        const responseTimes: number[] = [];

        const requests = Array.from({ length: numberOfRequests }, async (_, i) => {

            const startTime = Date.now();

            const response = await request.get(POSTS_ENDPOINT);

            const endTime = Date.now();

            const responseTime = endTime - startTime;

            responseTimes.push(responseTime);

            return response;

        });

        const responses = await Promise.all(requests);

        responses.forEach(response => {

            expect(response.ok()).toBeTruthy();

        });

        const averageTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

        const maxTime = Math.max(...responseTimes);

        const minTime = Math.min(...responseTimes);

        console.log(`Concurrent requests stats:`);

        console.log(`  - Average: ${averageTime.toFixed(2)}ms`);

        console.log(`  - Min: ${minTime}ms`);

        console.log(`  - Max: ${maxTime}ms`);

        console.log(`  - All times: ${responseTimes.join(', ')}ms`);

        expect(averageTime).toBeLessThan(2500);

    });

    test('Load test - Sequential requests performance', async ({ request }) => {

        const numberOfRequests = 10;

        const responseTimes: number[] = [];

        const startTotal = Date.now();

        for (let i = 0; i < numberOfRequests; i++) {

            const startTime = Date.now();

            const response = await request.get(`${POSTS_ENDPOINT}?per_page=5`);

            const endTime = Date.now();

            const responseTime = endTime - startTime;

            responseTimes.push(responseTime);

            expect(response.ok()).toBeTruthy();

        }

        const endTotal = Date.now();

        const totalTime = endTotal - startTotal;

        const averageTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;

        console.log(`Sequential load test (${numberOfRequests} requests):`);

        console.log(`  - Total time: ${totalTime}ms`);

        console.log(`  - Average per request: ${averageTime.toFixed(2)}ms`);

        console.log(`  - Requests per second: ${(numberOfRequests / (totalTime / 1000)).toFixed(2)}`);


        expect(averageTime).toBeLessThan(2000);

    });

    test('Response time by pagination size', async ({ request }) => {

        const pageSizes = [1, 5, 10, 20, 50];

        const results: { size: number; time: number }[] = [];

        for (const size of pageSizes) {

            const startTime = Date.now();

            const response = await request.get(`${POSTS_ENDPOINT}?per_page=${size}`);

            const endTime = Date.now();

            const responseTime = endTime - startTime;

            expect(response.ok()).toBeTruthy();

            results.push({ size, time: responseTime });

        }

        console.log(`Response time by page size:`);

        results.forEach(result => {

            console.log(`  - ${result.size} posts: ${result.time}ms`);

        });

        results.forEach(result => {

            expect(result.time).toBeLessThan(3000);

        });

    });

});
