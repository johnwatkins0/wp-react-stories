import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withStateContext, withActionContext } from '../Context';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`;

const StyledButton = styled.button`
  flex: 0 0 46%;
  padding: 0.375rem;
  margin-right: 0.25rem;
  margin-bottom: 0.5rem;
  margin-left: 0.25rem;
  font-size: 66.6%;
  line-height: 1.2;
  color: black;
  color: var(--color, black);
  text-transform: uppercase;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.075);
  background: var(--light-gray, rgba(0, 0, 0, 0.075));
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  transition: 0.2s background-color;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
    background: var(--background-hover-color, rgba(0, 0, 0, 0.1));
  }
`;

export const PostCategories = ({
  post, setActiveCategory, categories,
}) => (
  <StyledContainer>
    {categories
      .filter(category => post.categories.indexOf(category.id) !== -1)
      .map(({ id, name, slug }) => (
        <StyledButton
          className={`Stories__category--${slug}`}
          key={id}
          onClick={() => {
            setActiveCategory(String(id));
          }}
          dangerouslySetInnerHTML={{ __html: name }}
        />
        ))}
  </StyledContainer>
);

PostCategories.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStateContext(withActionContext(PostCategories));

