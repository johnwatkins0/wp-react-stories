import React from 'react';
import renderer from 'react-test-renderer';

import Story from '../Story';
import { posts, media } from '../../__tests__/testData';

describe('Story', () => {
  it('renders', () => {
    const tree = renderer.create(<Story
      post={posts[0]}
      fetchPostMedia={() => null}
      setActiveCategory={() => null}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with a featured image', () => {
    const post = { ...posts[0], featuredImage: media };
    const tree = renderer.create(<Story
      post={post}
      fetchPostMedia={() => null}
      setActiveCategory={() => null}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('renders with featured_media property', () => {
    const tree = renderer.create(<Story
      post={posts[1]}
      fetchPostMedia={() => null}
      setActiveCategory={() => null}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
