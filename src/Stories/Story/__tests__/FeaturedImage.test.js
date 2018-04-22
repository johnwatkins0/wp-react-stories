import React from 'react';
import renderer from 'react-test-renderer';

import FeaturedImage from '../FeaturedImage';
import { media } from '../../__tests__/testData';

describe('FeaturedImage', () => {
  it('handles an invalid image object', () => {
    const tree = renderer.create(<FeaturedImage
      featuredImage={{}}
      altText="My alt text"
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles an image object with a large photo', () => {
    const tree = renderer.create(<FeaturedImage
      featuredImage={media}
      altText="My alt text"
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('handles an image object with a medium photo', () => {
    const featuredImage = { ...media };
    featuredImage.media_details.sizes.medium = { ...featuredImage.media_details.sizes.large };
    delete featuredImage.media_details.sizes.large;

    const tree = renderer.create(<FeaturedImage
      featuredImage={featuredImage}
      altText="My alt text"
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
