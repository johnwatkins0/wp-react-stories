import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import dateFns from 'date-fns';

import { PostCategories } from './PostCategories';
import { FeaturedImage } from './FeaturedImage';

const StyledStory = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin-bottom: 1rem;
  font-size: 89.1%;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 2px;

  time {
    font-size: 89.1%;
  }
`;

const StyledStoryBody = styled.div`
  flex: 1 1 auto;
  padding: 0.75rem 1.25rem;
`;

const StyledStoryTitle = styled.h1`
  font-size: 119%;
  line-height: 1.333;
`;

import { fetchMedia } from '../utils/fetchMedia';

class Story extends React.Component {
  static propTypes = {
    mediaEndpoint: PropTypes.string.isRequired,
    setActiveCategory: PropTypes.func.isRequired,
    scrollToTop: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      featuredImage: {},
    };
  }

  componentDidMount() {
    this.maybeFetchFeaturedMedia();
  }

  async maybeFetchFeaturedMedia({ post, mediaEndpoint } = this.props) {
    if (post.featured_media === 0) {
      return;
    }

    const url = `${mediaEndpoint.replace(new RegExp('/$'), '')}/${
      post.featured_media
    }`;

    const featuredImage = await fetchMedia(url);
    this.setState({ featuredImage });
  }

  render = (
    { post, categories, setActiveCategory, scrollToTop } = this.props,
    { featuredImage } = this.state
  ) => (
    <StyledStory key={post.id}>
      <FeaturedImage
        altText={post.title.rendered}
        featuredImage={featuredImage}
      />
      <StyledStoryBody>
        <StyledStoryTitle>
          <a
            href={post.link}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </StyledStoryTitle>
        <time dateTime={post.date}>
          {dateFns.distanceInWords(new Date(), post.date, {
            addSuffix: true,
          })}
        </time>
        <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      </StyledStoryBody>
      <PostCategories
        setActiveCategory={setActiveCategory}
        categories={categories}
        scrollToTop={scrollToTop}
        post={post}
      />
    </StyledStory>
  );
}

export default Story;
