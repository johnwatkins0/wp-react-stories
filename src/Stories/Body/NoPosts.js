import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStateContext } from '../Context';

const StyledNoPosts = styled.div`
  width: 100%;
  padding-right: 0.75rem;
  padding-left: 0.75rem;
`;

const getNoPostsText = ({ searchTerm, fetching }) => {
  if (searchTerm.length) {
    return `No results for <i>${searchTerm}</i>`;
  }

  return fetching ? '' : 'No posts found.';
};

const NoPosts = ({ searchTerm, fetching }) => (
  <StyledNoPosts
    dangerouslySetInnerHTML={{
          __html: getNoPostsText({ searchTerm, fetching }),
        }}
  />
);

NoPosts.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  fetching: PropTypes.bool.isRequired,
};

export default withStateContext(NoPosts);
