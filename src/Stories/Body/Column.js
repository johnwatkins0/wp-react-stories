import PropTypes from 'prop-types';
import styled from 'styled-components';

import Story from '../Story';

import { withStateContext } from '../Context';

const StyledColumn = styled.div`
  flex: 1 1 ${({ columnCount }) => 100 / columnCount}%;
  max-width: ${({ columnCount }) => 100 / columnCount}%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
`;

const getPostsForColumn = ({ columnNumber, posts, columnCount }) =>
  posts.filter((post, i) => i % columnCount === columnNumber);

const Column = ({ columnCount, columnNumber, posts }) => (
  <StyledColumn columnCount={columnCount} key={columnNumber}>
    {getPostsForColumn(({ columnNumber, posts, columnCount })).map(post => (
      <Story
        key={post.id}
        post={post}
      />
    ))}
  </StyledColumn>
);

Column.propTypes = {
  columnCount: PropTypes.number.isRequired,
  columnNumber: PropTypes.number.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStateContext(Column);
