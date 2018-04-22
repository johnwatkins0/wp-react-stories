import React from 'react';
import styled from 'styled-components';

import { withStateContext, withActionContext } from '../Context';

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

export const CategoryPicker = ({ setActiveCategory, categories, activeCategory }) => (
  categories.length && (
  <StyledCategoryPicker>
    <label htmlFor="category-select">
      <span>Category </span>
      <select
        id="category-select"
        value={activeCategory}
        onChange={(event) => {
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
  )
);

export default withStateContext(withActionContext(CategoryPicker));

