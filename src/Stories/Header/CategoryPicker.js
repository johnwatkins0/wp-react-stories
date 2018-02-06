import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCategoryPicker = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 0;
  font-size: 79.4%;
  text-transform: uppercase;

  select {
    font-size: 1rem;
  }
`;

export const CategoryPicker = (
  { activeCategory, categories, setActiveCategory } = this.props
) =>
  categories.length ? (
    <StyledCategoryPicker>
      <label>
        <span>Category </span>
        <select
          value={activeCategory}
          onChange={event => {
            setActiveCategory(event.target.value);
          }}
        >
          <option value={0}>All</option>
          {categories.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </StyledCategoryPicker>
  ) : null;

CategoryPicker.propTypes = {
  activeCategory: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
};
