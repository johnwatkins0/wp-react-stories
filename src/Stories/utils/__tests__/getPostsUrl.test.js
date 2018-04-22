import { getPostsUrl } from '..';

test('getPostsUrl function', () => {
  const fields = '&_fields=title,content,excerpt,id,featured_media,categories,date';
  let endpoint = 'http://mysite.com/wp-json/wp/v2/';

  expect(getPostsUrl({
    endpoint,
    perPage: 12,
    activeCategory: 0,
    searchTerm: '',
    currentPage: 1,
  })).toBe(`${endpoint}?per_page=12${fields}`);

  expect(getPostsUrl({
    endpoint,
    perPage: 12,
    activeCategory: '4',
    searchTerm: 'hello',
    currentPage: 4,
  })).toBe(`${endpoint}?per_page=12&categories=4&search=hello&page=4${fields}`);

  endpoint = 'http://mysite.com/wp-json/wp/v2/?tags=1';
  expect(getPostsUrl({
    endpoint,
    perPage: 12,
    activeCategory: 0,
    searchTerm: '',
    currentPage: 1,
  })).toBe(`${endpoint}&per_page=12${fields}`);
});
