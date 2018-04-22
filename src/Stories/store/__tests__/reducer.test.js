import reducer from '../reducer';

import { state as originalState, posts, categories } from '../../__tests__/testData';

describe('reducer', () => {
  it('handles a nonexistent action', () => {
    const state = { ...originalState };
    expect(reducer(state)).toMatchObject({ ...state });
  });

  it('handles a non-matching action', () => {
    const state = { ...originalState };
    expect(reducer(state, { type: 'SOME_ACTION' })).toMatchObject({ ...state });
  });

  it('handles FETCH_POSTS', () => {
    const state = { ...originalState };
    expect(reducer(state, { type: 'FETCH_POSTS' })).toMatchObject({
      ...state,
      fetching: true,
    });
  });

  it('handles RECEIVE_POSTS', () => {
    const state = { ...originalState };
    state.fetching = true;
    const newPosts = posts.concat(posts);
    const totalPages = 99;
    const canGetMore = false;
    expect(reducer(state, {
      type: 'RECEIVE_POSTS', posts: newPosts, totalPages, canGetMore,
    })).toMatchObject({
      ...state,
      posts: newPosts,
      totalPages,
      canGetMore,
      fetching: false,
    });
  });

  it('handles UPDATE_POSTS', () => {
    const state = { ...originalState };
    const newPosts = posts.concat(posts);
    expect(reducer(state, {
      type: 'UPDATE_POSTS',
      posts: newPosts,
    })).toMatchObject({
      ...state,
      posts: newPosts,
    });
  });

  it('handles SET_CURRENT_PAGE', () => {
    const state = { ...originalState };
    const currentPage = 7;
    expect(reducer(state, {
      type: 'SET_CURRENT_PAGE',
      currentPage,
    })).toMatchObject({
      ...state,
      currentPage,
    });
  });

  it('handles RECEIVE_CATEGORIES', () => {
    const state = { ...originalState };
    state.categories = [];
    const newCategories = categories.concat(categories);
    expect(reducer(state, {
      type: 'RECEIVE_CATEGORIES',
      categories: newCategories,
    })).toMatchObject({
      ...state,
      categories: newCategories,
    });
  });

  it('handles SET_ACTIVE_CATEGORY', () => {
    const state = { ...originalState };
    const activeCategory = 88;
    expect(reducer(state, {
      type: 'SET_ACTIVE_CATEGORY',
      activeCategory,
    })).toMatchObject({
      ...state,
      activeCategory,
    });
  });

  it('handles SET_SEARCH_TERM', () => {
    const state = { ...originalState };
    const searchTerm = 'hello';
    expect(reducer(state, {
      type: 'SET_SEARCH_TERM',
      searchTerm,
    })).toMatchObject({
      ...state,
      searchTerm,
    });
  });

  it('handles SET_COLUMN_COUNT', () => {
    const state = { ...originalState };
    const columnCount = 1;
    expect(reducer(state, {
      type: 'SET_COLUMN_COUNT',
      columnCount,
    })).toMatchObject({
      ...state,
      columnCount,
    });
  });
});

