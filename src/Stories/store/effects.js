import { receivePosts, receiveCategories, receivePostMedia, updatePosts } from './actions';
import { getCurrentPage, getPosts } from './selectors';

export const POSTS_CACHE = {};
export const MEDIA_CACHE = {};

const effects = {
  FETCH_POSTS: async (action, { dispatch, getState }) => {
    const state = getState();
    if (!(action.url in POSTS_CACHE)) {
      const response = await fetch(action.url);
      const totalPages = Number(response.headers.get('X-WP-TOTALPAGES'));
      const canGetMore = totalPages > getCurrentPage();
      const posts = await response.json();
      POSTS_CACHE[action.url] = { posts, totalPages, canGetMore };
    }

    const newPosts = getCurrentPage(state) === 1
      ? POSTS_CACHE[action.url].posts
      : getPosts(state).concat(POSTS_CACHE[action.url].posts);

    dispatch(receivePosts(
      newPosts,
      POSTS_CACHE[action.url].totalPages,
      POSTS_CACHE[action.url].canGetMore,
    ));
  },

  FETCH_CATEGORIES: async (action, { dispatch }) => {
    const response = await fetch(action.url);
    const categories = await response.json();
    dispatch(receiveCategories(categories));
  },

  FETCH_POST_MEDIA: async (action, { dispatch }) => {
    if (!(action.url in MEDIA_CACHE)) {
      const response = await fetch(action.url);
      const json = await response.json();

      MEDIA_CACHE[action.url] = json;
    }

    dispatch(receivePostMedia(MEDIA_CACHE[action.url]));
  },

  RECEIVE_POST_MEDIA: (action, { dispatch, getState }) => {
    const posts = getPosts(getState()).map((post) => {
      if (post.id === action.postId) {
        return {
          ...post,
          featuredImage: action.media,
        };
      }

      return post;
    });

    dispatch(updatePosts(posts));
  },
};

export default effects;
