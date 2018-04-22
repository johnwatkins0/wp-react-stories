import { getCurrentPage, getPosts } from '../selectors';

import { state, posts } from '../../__tests__/testData';

test('getCurrentPage selector', () => {
  expect(getCurrentPage(state)).toBe(1);
});

test('getPosts selector', () => {
  expect(getPosts(state)).toBe(posts);
});
