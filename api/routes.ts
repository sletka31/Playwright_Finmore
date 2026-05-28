import { env } from '../config/env';

export const routes = {
    posts: {
        base: `${env.baseUrl}/posts`,
        byId: (id: number) => `${env.baseUrl}/posts/${id}`
    }
};