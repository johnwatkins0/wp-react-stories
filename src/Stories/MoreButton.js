import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStateContext, withActionContext } from './Context';

const StyledMoreButtonContainer = styled.div`
  width: 100%;
  padding-top: 1.5rem;
  text-align: center;
`;

const StyledMoreButton = styled.button`
  padding: 0.5rem 1rem;
  margin-right: 0.25rem;
  margin-bottom: 0.5rem;
  margin-left: 0.25rem;
  font-size: 79.4%;
  line-height: 1.2;
  color: white;
  color: var(--color, white);
  text-transform: uppercase;
  cursor: pointer;
  background: #214280;
  background: var(--primary, #214280);
  border: none;
  border-radius: 2px;
  transition: 0.2s background-color;

  &:hover {
    background: #1e3b73;
    background: var(--background-hover-color, #1e3b73);
  }
`;

export const MoreButton = ({ canGetMore, currentPage, setCurrentPage }) =>
  canGetMore && (
  <StyledMoreButtonContainer>
    <StyledMoreButton
      onClick={() => setCurrentPage(currentPage + 1)}
    >
        More
    </StyledMoreButton>
  </StyledMoreButtonContainer>
  );

MoreButton.propTypes = {
  canGetMore: PropTypes.bool.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default withStateContext(withActionContext(MoreButton));
