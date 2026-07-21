import { faker } from '@faker-js/faker';

export const userData = {

    createUser() {
        return {
            name: `${faker.person.firstName()}_${Date.now()}`,
            job: faker.person.jobTitle()
        };
    },

    updateUser() {
        return {
            name: `${faker.person.firstName()}_${Date.now()}`,
            job: faker.person.jobTitle()
        };
    }

}