import { faker } from '@faker-js/faker';
import { title } from 'node:process';

export const generatePostData = () => ({
   // title: faker.lorem.sentence(),
    title: faker.person.firstName(),
    content: faker.lorem.words (1000),
    status: 'publish',
    excerpt: faker.lorem.sentence()
});