import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.375rem;
  width: 100%;
  border: 1px solid rgba(53, 53, 53, 0.3);
  border-radius: 2px;
  background: #fff;
  font-size: 94.4%;
`;

const StyledSecretText = styled.span`
  position: absolute;
  left: -1000%;
`;

const SearchInput = ({ searchTerm, onSearchTermChange }) => (
  <label>
    <StyledSecretText>Search</StyledSecretText>
    <StyledInput
      placeholder="Search"
      type="search"
      value={searchTerm}
      onChange={event => {
        onSearchTermChange(event.target.value);
      }}
    />
  </label>
);

SearchInput.propTypes = {
  onSearchTermChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default SearchInput;
