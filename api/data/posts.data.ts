import { faker } from '@faker-js/faker';

export const generateCustom = () => {

    return {

        title: faker.company.catchPhrase(),

        content: faker.lorem.paragraphs(3),

        status: 'publish'

    };

};