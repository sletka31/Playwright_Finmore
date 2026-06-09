import { env } from '../config/env';

export const routes = {
    posts: {
        base: `${env.baseUrl}/posts`,
        byId: (id: number) => `${env.baseUrl}/posts/${id}`
    },

    pages: {
        base:  `${env.baseUrl}/pages`,
        byId: (id: number) => `${env.baseUrl}/pages/${id}`
    }
};