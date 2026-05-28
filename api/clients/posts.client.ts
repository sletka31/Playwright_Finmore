import { BaseClient } from '../base.client';
import { routes } from '../routes';
import { getAuthHeaders } from '../utils/auth';

export class PostsClient extends BaseClient {

    async getAllPosts() {
        return this.get(routes.posts.base);
    }

    async getPostById(id: number) {
        return this.get(routes.posts.byId(id));
    }

    async createPost(data: any) {
        return this.post(routes.posts.base, data, getAuthHeaders());
    }

    async updatePost(id: number, data: any) {
        return this.put(routes.posts.byId(id), data, getAuthHeaders());
    }

    async patchPost(id: number, data: any) {
        return this.patch(routes.posts.byId(id), data, getAuthHeaders());
    }

    async deletePost(id: number) {
        return this.delete(routes.posts.byId(id), getAuthHeaders());
    }
}