import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStateContext, withActionContext } from '../Context';

const StyledInput = styled.input`
  width: 100%;
  padding: 0.375rem;
  font-size: 94.4%;
  background: #fff;
  border: 1px solid rgba(53, 53, 53, 0.3);
  border-radius: 2px;
`;

const StyledLabel = styled.label`
  display: block;
  width: 100%;
`;

const StyledSecretText = styled.span`
  position: absolute;
  left: -1000%;
`;

const SearchInput = ({ setSearchTerm, searchTerm }) => (
  <StyledLabel>
    <StyledSecretText>Search</StyledSecretText>
    <StyledInput
      placeholder="Search"
      value={searchTerm}
      onChange={(event) => {
        setSearchTerm(event.target.value);
      }}
    />
  </StyledLabel>
);

SearchInput.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default withStateContext(withActionContext(SearchInput));
