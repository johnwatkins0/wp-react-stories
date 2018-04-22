/**
 * Action creator triggering fetch of posts.
 *
 * @param {string} url The URL to fetch from.
 * @return {Object} An action object.
 */
export const fetchPosts = url => ({
  type: 'FETCH_POSTS',
  url,
});

/**
 * Action creator signaling posts have been received.
 *
 * @param {array} posts The received posts.
 * @param {number} totalPages The number of pages of posts.
 * @param {bool} canGetMore Whether more pages can be retrieved.
 * @return {Object} An action object.
 */
export const receivePosts = (posts, totalPages, canGetMore) => ({
  type: 'RECEIVE_POSTS',
  posts,
  totalPages,
  canGetMore,
});

/**
 * Action creator setting the current page in the app.
 *
 * @param {*} currentPage The current page of posts.
 * @return {Object} An action object.
 */
export const setCurrentPage = currentPage => ({
  type: 'SET_CURRENT_PAGE',
  currentPage,
});

/**
 * Action creator signaling categories should be fetched from a URL.
 *
 * @param {string} url The category endpoing.
 * @return {Object} An action object.
 */
export const fetchCategories = url => ({
  type: 'FETCH_CATEGORIES',
  url,
});

/**
 * Action creator signaling that categories have been received.
 *
 * @param {array} categories The list of category objects.
 * @return {Object} An action object.
 */
export const receiveCategories = categories => ({
  type: 'RECEIVE_CATEGORIES',
  categories,
});

/**
 * Action creator signaling that an active category has been set.
 *
 * @param {number|string} activeCategory A numeric category ID.
 * @return {Object} An action object.
 */
export const setActiveCategory = activeCategory => ({
  type: 'SET_ACTIVE_CATEGORY',
  activeCategory,
});

/**
 * Action creator signaling the search term has changed.
 *
 * @param {string} searchTerm The search term.
 * @return {Object} An action object.
 */
export const setSearchTerm = searchTerm => ({
  type: 'SET_SEARCH_TERM',
  searchTerm,
});

/**
 * Action creator signaling media is being fetched.
 *
 * @param {number|string} postId A numeric post ID.
 * @param {string} url A media endpoint.
 * @return {Object} An action object.
 */
export const fetchPostMedia = (postId, url) => ({
  type: 'FETCH_POST_MEDIA',
  postId,
  url,
});

/**
 * Action creator signaling post media has been received.
 *
 * @param {number|string} postId A numeric post ID.
 * @param {Object} media A media object.
 * @return {Object} An action object.
 */
export const receivePostMedia = (postId, media) => ({
  type: 'RECEIVE_POST_MEDIA',
  postId,
  media,
});

/**
 * Action creator signaling posts should be updated.
 *
 * @param {array} posts An array of post objects.
 * @return {Object} An action object.
 */
export const updatePosts = posts => ({
  type: 'UPDATE_POSTS',
  posts,
});

/**
 * Action creator signaling the number of columns has changed.
 *
 * @param {number} columnCount The number of columns to show.
 * @return {Object} An action object.
 */
export const setColumnCount = columnCount => ({
  type: 'SET_COLUMN_COUNT',
  columnCount,
});
