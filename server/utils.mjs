import faker from "faker";
import { v4 as uuid } from "uuid";

function makeUser() {
  return {
    id: uuid(),
    name: faker.name.findName()
  }
}

const userBase = new Array(25).fill(null).map(makeUser);

function randomIntBetween(min, max) {
  const range = max - min;
  return min + Math.round(Math.random() * range);
}

function getRandomUser() {
  return userBase[randomIntBetween(0, userBase.length - 1)];
}

function makePost() {
  return {
    id: uuid(),
    author: getRandomUser(),
    title: faker.lorem.sentence(5),
    text: faker.lorem.paragraph(1),
    comments: new Array(randomIntBetween(0, 10)).fill(null).map(() => {
      return makeComment();
    })
  }
}

function makeComment(depth = 0) {
  const numComments = depth > 2 ? 0 : randomIntBetween(0, 7 * 1 / (depth + 1));
  return {
    id: uuid(),
    author: getRandomUser(),
    text: faker.lorem.paragraph(1),
    upvotes: randomIntBetween(0, 40),
    downvotes: randomIntBetween(0, 30),
    replies: new Array(numComments).fill(null).map(() => {
      return makeComment(depth + 1);
    })
  }
}

export function makeDatabase() {
  return new Array(randomIntBetween(10, 500)).fill(null).map(makePost)
}