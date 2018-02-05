import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { range } from 'range';

import Story from '../Story';

const StyledColumnContainer = styled.div`
  display: flex;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
`;

const StyledColumn = styled.div`
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  flex: 1 1 ${({ columnCount }) => 100 / columnCount}%;
  max-width: ${({ columnCount }) => 100 / columnCount}%;
`;

class Body extends React.Component {
  setColumnCount = this.setColumnCount.bind(this);

  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    mediaEndpoint: PropTypes.string.isRequired,
    setActiveCategory: PropTypes.func.isRequired,
    scrollToTop: PropTypes.func.isRequired,
  };

  static getColumnCount(element = window || document.defaultView) {
    if ((element.innerWidth || element.clientWidth) > 768) {
      return 3;
    }

    if ((element.innerWidth || element.clientWidth) > 576) {
      return 2;
    }

    return 1;
  }

  constructor(props) {
    super(props);

    this.state = {
      columnCount: Body.getColumnCount(),
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.setColumnCount);
    this.setColumnCount();
  }

  getPostsForColumn = columnNumber =>
    this.props.posts.filter(
      (post, i) => i % this.state.columnCount === columnNumber
    );

  setColumnCount() {
    this.setState({ columnCount: Body.getColumnCount() });
  }

  renderColumn = columnNumber => (
    <StyledColumn key={columnNumber} columnCount={this.state.columnCount}>
      {this.getPostsForColumn(columnNumber).map(post => (
        <Story
          key={post.id}
          post={post}
          scrollToTop={this.props.scrollToTop}
          categories={this.props.categories}
          mediaEndpoint={this.props.mediaEndpoint}
          setActiveCategory={this.props.setActiveCategory}
        />
      ))}
    </StyledColumn>
  );

  render = (
    { searchTerm, posts } = this.props,
    { columnCount } = this.state
  ) => (
    <StyledColumnContainer
      innerRef={element => {
        this.columnContainer = element;
      }}
    >
      {searchTerm.length && posts.length === 0 ? (
        <div>
          No results for <i>{searchTerm}</i>
        </div>
      ) : (
        range(0, columnCount).map(this.renderColumn)
      )}
    </StyledColumnContainer>
  );
}

export default Body;
