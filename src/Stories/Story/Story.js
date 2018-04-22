/* eslint react/no-danger: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import distanceInWords from 'date-fns/distance_in_words';

import Categories from './PostCategories';
import FeaturedImage from './FeaturedImage';

import { withActionContext } from '../Context';

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

class Story extends React.Component {
  static propTypes = {
    fetchPostMedia: PropTypes.func.isRequired,
    post: PropTypes.objectOf(PropTypes.any).isRequired,
    setActiveCategory: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (this.props.post.featured_media !== 0) {
      this.props.fetchPostMedia(this.props.post.ID, this.props.post.featuredMedia);
    }
  }

  render = ({ post, setActiveCategory } = this.props) => (
    <StyledStory key={post.id}>
      {post.featuredImage && <FeaturedImage
        altText={post.title.rendered}
        featuredImage={post.featuredImage}
      />}
      <StyledStoryBody>
        <StyledStoryTitle>
          <a
            href={post.link}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
        </StyledStoryTitle>
        <time dateTime={post.date}>
          {distanceInWords(new Date(), post.date, {
            addSuffix: true,
          })}
        </time>
        <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
      </StyledStoryBody>
      <Categories post={post} setActiveCategory={setActiveCategory} />
    </StyledStory>
  );
}

export default withActionContext(Story);
