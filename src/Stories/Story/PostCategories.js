import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`;

const StyledButton = styled.button`
  background: #214280;
  background: var(--primary, #214280);
  border-radius: 2px;
  font-size: 79.4%;
  margin-bottom: 0.5rem;
  margin-right: 0.25rem;
  margin-left: 0.25rem;
  line-height: 1.2;
  text-transform: uppercase;
  padding: 0.375rem;
  transition: 0.2s background-color;
  cursor: pointer;
  color: white;
  color: var(--color, white);

  &:hover {
    background: #1e3b73;
    background: var(--background-hover-color, #1e3b73);
  }
`;

export const PostCategories = ({
  categories,
  post,
  setActiveCategory,
  scrollToTop,
} = props) => (
  <StyledContainer>
    {categories
      .filter(category => post.categories.indexOf(category.id) !== -1)
      .map(({ id, name, meta, link, slug }) => (
        <StyledButton
          className={`Stories__category--${slug}`}
          key={id}
          onClick={() => {
            scrollToTop();
            setActiveCategory(String(id));
          }}
          dangerouslySetInnerHTML={{ __html: name }}
        />
      ))}
  </StyledContainer>
);

PostCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  scrollToTop: PropTypes.func.isRequired,
};
