/**
 * Reducer handling all changes to app state.
 *
 * @param {Object} state Current state.
 * @param {Object} action Action object.
 * @return {Object} The next state.
 */
function reducer(state, action = {}) {
  switch (action.type) {
    case 'FETCH_POSTS': {
      return {
        ...state,
        fetching: true,
      };
    }

    case 'RECEIVE_POSTS': {
      return {
        ...state,
        posts: action.posts,
        totalPages: action.totalPages,
        canGetMore: action.canGetMore,
        fetching: false,
      };
    }

    case 'UPDATE_POSTS': {
      return {
        ...state,
        posts: action.posts,
      };
    }

    case 'SET_CURRENT_PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }

    case 'RECEIVE_CATEGORIES': {
      return {
        ...state,
        categories: action.categories,
      };
    }

    case 'SET_ACTIVE_CATEGORY': {
      return {
        ...state,
        activeCategory: action.activeCategory,
      };
    }

    case 'SET_SEARCH_TERM': {
      return {
        ...state,
        searchTerm: action.searchTerm,
      };
    }

    case 'SET_COLUMN_COUNT': {
      return {
        ...state,
        columnCount: action.columnCount,
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
