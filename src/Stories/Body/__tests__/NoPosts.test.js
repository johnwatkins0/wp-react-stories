import React from 'react';
import renderer from 'react-test-renderer';

import { NoPosts } from '../NoPosts';

describe('NoPosts', () => {
  it('renders no results for search', () => {
    const tree = renderer.create(<NoPosts fetching={false} searchTerm="my search" />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders no posts at all', () => {
    const tree = renderer.create(<NoPosts fetching={false} searchTerm="" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
