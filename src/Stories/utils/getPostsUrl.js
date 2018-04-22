/**
 * Builds a WordPress REST URL for posts.
 *
 * @param {Object} params Settings.
 * @param {string} params.endpoint The URL of the REST endpoint.
 * @param {number|string} params.perPage The number of posts per page.
 * @param {number|string} params.activeCategory The current category ID.
 * @param {string} params.searchTerm The current search term.
 * @param {number} params.currentPage The page number to query.
 * @return {string} The query URL.
 */
export const getPostsUrl = ({
  endpoint,
  perPage,
  activeCategory,
  searchTerm,
  currentPage,
}) => {
  const separator = endpoint.indexOf('?') === -1 ? '?' : '&';
  let url = `${endpoint}${separator}per_page=${perPage}`;

  if (activeCategory !== '0' && activeCategory !== 0) {
    url = `${url}&categories=${activeCategory}`;
  }

  if (searchTerm.length) {
    url = `${url}&search=${searchTerm}`;
  }

  if (currentPage !== '1' && currentPage !== 1) {
    url = `${url}&page=${currentPage}`;
  }

  return `${url}&_fields=title,content,excerpt,id,featured_media,categories,date`;
};
