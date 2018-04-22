import get from 'lodash.get';

/**
 * Gets the current page from the app state.
 *
 * @param {Object} state An app state.
 * @return {number} The current page.
 */
export const getCurrentPage = state => get(state, 'currentPage', 0);

/**
 * Gets the current posts from the app state.
 *
 * @param {Object} state The current app state.
 * @return {array} The current posts.
 */
export const getPosts = state => get(state, 'posts', []);
