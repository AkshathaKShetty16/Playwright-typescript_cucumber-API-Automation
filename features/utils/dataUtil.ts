import { faker } from '@faker-js/faker';

export function buildPost() {
  return {
    title: faker.lorem.words(3),
    body: faker.lorem.sentence(),
    userId: faker.number.int({ min: 1, max: 100 }),
  };
}

export function buildUpdatedPost(postId: number) {
  return {
    id: postId,
    title: faker.lorem.words(4),
    body: faker.lorem.sentence(),
    userId: faker.number.int({ min: 1, max: 100 }),
  };
}
