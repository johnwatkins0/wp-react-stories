import {
  fetchPosts,
  receivePosts,
  setCurrentPage,
  fetchCategories,
  receiveCategories,
  setActiveCategory,
  setSearchTerm,
  fetchPostMedia,
  receivePostMedia,
  updatePosts,
  setColumnCount,
} from '../actions';

import { posts, categories, media } from '../../__tests__/testData';

test('fetchPosts action', () => {
  const url = 'http://myurl';
  expect(fetchPosts(url)).toMatchObject({
    type: 'FETCH_POSTS',
    url,
  });
});

test('receivePosts action', () => {
  const totalPages = 500;
  const canGetMore = true;
  expect(receivePosts(posts, totalPages, canGetMore)).toEqual({
    type: 'RECEIVE_POSTS',
    posts,
    totalPages,
    canGetMore,
  });
});

test('setCurrentPage action', () => {
  expect(setCurrentPage(5)).toMatchObject({
    type: 'SET_CURRENT_PAGE',
    currentPage: 5,
  });
});

test('fetchCategories action', () => {
  const url = 'http://my-categories-endpoint';
  expect(fetchCategories(url)).toMatchObject({
    type: 'FETCH_CATEGORIES',
    url,
  });
});

test('receiveCategories action', () => {
  expect(receiveCategories(categories)).toMatchObject({
    type: 'RECEIVE_CATEGORIES',
    categories,
  });
});

test('setActiveCategory action', () => {
  expect(setActiveCategory(555)).toMatchObject({
    type: 'SET_ACTIVE_CATEGORY',
    activeCategory: 555,
  });
});

test('setSearchTerm action', () => {
  const searchTerm = 'hello';
  expect(setSearchTerm(searchTerm)).toMatchObject({
    type: 'SET_SEARCH_TERM',
    searchTerm,
  });
});

test('fetchPostMedia action', () => {
  const postId = 57;
  const url = 'http://my-media-endpoint';
  expect(fetchPostMedia(postId, url)).toMatchObject({
    type: 'FETCH_POST_MEDIA',
    postId,
    url,
  });
});

test('receivePostMedia action', () => {
  const postId = 78;
  expect(receivePostMedia(postId, media)).toMatchObject({
    type: 'RECEIVE_POST_MEDIA',
    postId,
    media,
  });
});

test('updatePosts action', () => {
  expect(updatePosts(posts)).toMatchObject({
    type: 'UPDATE_POSTS',
    posts,
  });
});

test('setColumnCount action', () => {
  const columnCount = 3;
  expect(setColumnCount(columnCount)).toMatchObject({
    type: 'SET_COLUMN_COUNT',
    columnCount,
  });
});
