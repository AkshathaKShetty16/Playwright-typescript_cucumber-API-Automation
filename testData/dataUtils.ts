import { faker } from '@faker-js/faker';

export const userData = {
    createUser: () => ({
        name: faker.person.firstName(),
        job: faker.person.jobTitle(),
    }),

    updateUser: () => ({
        name: faker.person.fullName(),
        job: 'Senior SDET',
    }),
};

export const dataUtils = userData;