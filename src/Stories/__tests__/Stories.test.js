import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import set from 'lodash.set';

import Stories from '..';
import { posts } from './testData';

Enzyme.configure({ adapter: new Adapter() });

const postsHeaders = { 'X-WP-TOTALPAGES': 999 };
const mockPostsFetchResponse = jsonData => ({
  json: () =>
    new Promise((resolve) => {
      resolve(jsonData);
    }),
  ok: true,
  headers: {
    ...postsHeaders,
    get: key => postsHeaders[key],
  },
});


const fetchMock = url =>
  new Promise((resolve) => {
    if (url.indexOf('v2/posts') > -1) {
      resolve(mockPostsFetchResponse(posts));
    }
  });

set(global, 'fetch', fetchMock);

const getMyComponent = () => (
  <Stories
    endpoint="https://make.wordpress.org/core/wp-json/wp/v2/posts/"
    mediaEndpoint="https://make.wordpress.org/core/wp-json/wp/v2/media/"
    categoriesEndpoint="https://make.wordpress.org/core/wp-json/wp/v2/categories/"
  />
);

describe('Stories', () => {
  it('renders', () => {
    const tree = renderer.create(getMyComponent()).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('can set a new category', () => {
    const wrapper = shallow(getMyComponent());
    expect(wrapper.state('activeCategory')).toBe(0);
    wrapper.instance().setActiveCategory(66);
    expect(wrapper.state('activeCategory')).toBe(66);
  });

  it('can set a new page', () => {
    const wrapper = shallow(getMyComponent());
    expect(wrapper.state('currentPage')).toBe(1);
    wrapper.instance().setCurrentPage(2);
    expect(wrapper.state('currentPage')).toBe(2);
  });

  it('can set a new search term', () => {
    const wrapper = shallow(getMyComponent());
    expect(wrapper.state('searchTerm')).toBe('');
    wrapper.instance().setSearchTerm('hel');
    expect(wrapper.state('searchTerm')).toBe('hel');
  });
});
