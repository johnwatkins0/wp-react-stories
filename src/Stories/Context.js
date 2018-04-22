import React, { createContext } from 'react';

import { getColumnCount } from './utils/getColumnCount';

export const INITIAL_STATE_CONTEXT = {
  activeCategory: 0,
  fetching: true,
  categories: [],
  posts: [],
  searchTerm: '',
  currentPage: 1,
  canGetMore: false,
  columnCount: getColumnCount(),
};

export const StateContext = createContext(INITIAL_STATE_CONTEXT);
export const ActionContext = createContext();

export const withStateContext = OriginalComponent =>
  props => (
    <StateContext.Consumer>
      {stateProps => <OriginalComponent {...props} {...stateProps} />}
    </StateContext.Consumer>
  );

export const withActionContext = OriginalComponent =>
  props => (
    <ActionContext.Consumer>
      {actionProps => <OriginalComponent {...props} {...actionProps} />}
    </ActionContext.Consumer>
  );
