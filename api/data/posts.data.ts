import { faker } from '@faker-js/faker';
import { DataGenerator } from '../utils/datagenerate';


export const generateCustom = () => ({
   // title: faker.lorem.sentence(),
    title: DataGenerator.generatePostTitle(),
    content: DataGenerator.generatePostContent (),
    status: 'publish',
    excerpt: DataGenerator.generatePostExcerpt()
});




export const generatePostData = () => ({
   // title: faker.lorem.sentence(),
    title: faker.person.firstName(),
    content: faker.lorem.words (1000),
    status: 'publish',
    excerpt: faker.lorem.sentence()
});