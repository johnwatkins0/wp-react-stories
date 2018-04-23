import PropTypes from 'prop-types';
import styled from 'styled-components';

import NoPostsMessage from './NoPosts';
import Columns from './Columns';

import { withStateContext } from '../Context';

const StyledColumnContainer = styled.div`
  display: flex;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
`;

const Body = ({ posts }) => (
  <StyledColumnContainer>
    {posts.length === 0 ?
      <NoPostsMessage />
      :
      <Columns />
    }
  </StyledColumnContainer>
);

Body.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStateContext(Body);
