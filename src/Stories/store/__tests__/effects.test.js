import set from 'lodash.set';

import effects, { MEDIA_CACHE, POSTS_CACHE } from '../effects';
import { receivePosts, receiveCategories, receivePostMedia, updatePosts } from '../actions';

import { posts, state, categories, media } from '../../__tests__/testData';

const headers = { 'X-WP-TOTALPAGES': 999 };

const mockFetchResponse = jsonData => ({
  json: () =>
    new Promise((resolve) => {
      resolve(jsonData);
    }),
  ok: true,
  headers: {
    ...headers,
    get: key => headers[key],
  },
});

const getFetchMock = data => () =>
  new Promise((resolve) => {
    resolve(mockFetchResponse(data));
  });


describe('effects', () => {
  const dispatch = jest.fn();
  describe('FETCH_POSTS', () => {
    it('fetches posts', async () => {
      const fetchMock = getFetchMock(posts);
      set(global, 'fetch', fetchMock);

      effects.FETCH_POSTS({ url: 'http://my-endpoint' }, { dispatch, getState: () => ({ ...state }) });

      const response = await fetchMock();
      const receivedData = await response.json();

      expect(dispatch).toHaveBeenCalledWith(receivePosts(
        receivedData,
        999,
        true,
      ));
    });

    it('fetches posts from cache', async () => {
      const fetchMock = getFetchMock(posts);
      set(global, 'fetch', fetchMock);

      const url = 'http://my-endpoint';
      POSTS_CACHE[url] = { posts, totalPages: 999, canGetMore: true };

      effects.FETCH_POSTS({ url }, { dispatch, getState: () => ({ ...state }) });

      const response = await fetchMock();
      const receivedData = await response.json();

      expect(dispatch).toHaveBeenCalledWith(receivePosts(
        receivedData,
        999,
        true,
      ));
    });
  });

  describe('FETCH_CATEGORIES', () => {
    it('fetches categories', async () => {
      const fetchMock = getFetchMock(categories);
      set(global, 'fetch', fetchMock);

      effects.FETCH_CATEGORIES({}, { dispatch });

      const response = await fetchMock();
      const receivedData = await response.json();

      expect(dispatch).toHaveBeenCalledWith(receiveCategories(receivedData));
    });
  });

  describe('FETCH_POST_MEDIA', () => {
    it('fetches media', async () => {
      const fetchMock = getFetchMock(media);
      set(global, 'fetch', fetchMock);

      effects.FETCH_POST_MEDIA({ url: 'http://my-media-endpoint' }, { dispatch });

      const response = await fetchMock();
      const receivedData = await response.json();

      expect(dispatch).toHaveBeenCalledWith(receivePostMedia(receivedData));
    });

    it('fetches media from cache', async () => {
      const fetchMock = getFetchMock(media);
      set(global, 'fetch', fetchMock);

      const url = 'http://my-media-endpoint';
      MEDIA_CACHE[url] = media;

      effects.FETCH_POST_MEDIA({ url }, { dispatch });

      const response = await fetchMock();
      const receivedData = await response.json();

      expect(dispatch).toHaveBeenCalledWith(receivePostMedia(receivedData));
    });
  });

  describe('RECEIVE_POST_MEDIA', () => {
    it('handles received media', async () => {
      const fetchMock = getFetchMock(media);
      set(global, 'fetch', fetchMock);

      effects.RECEIVE_POST_MEDIA({ media, postId: state.posts[1].id }, {
        dispatch,
        getState: () => ({
          ...state,
        }),
      });

      const updatedPosts = posts.map(post => post);
      updatedPosts[1].featuredImage = media;

      const response = await fetchMock();
      await response.json();

      expect(dispatch).toHaveBeenCalledWith(updatePosts(updatedPosts));
    });
  });
});
