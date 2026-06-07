import { APIRequestContext }
    from '@playwright/test';

export class PostsClient {

    constructor(
        private request: APIRequestContext
    ) {}

  
   async createPost(data: object) {
 
    return await this.request.post(
        'posts',
        {
            data
        }
    );
 
}

    async getAllPosts() {

        return await this.request.get('posts');

    }

    async getPostById(id: number) {

        return await this.request.get(`posts/${id}`);

    }

    async updatePost(
        id: number,
        data: object
    ) {

        return await this.request.put(
            `posts/${id}`,
            {
                data
            }
        );

    }

    async deletePost(id: number) {

        return await this.request.delete(
            `posts/${id}`,
            {
                params: {
                    force: true
                }
            }
        );

    }

}