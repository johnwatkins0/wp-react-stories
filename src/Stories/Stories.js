/* eslint react/no-danger: 0 */
import PropTypes from 'prop-types';
import styled from 'styled-components';
import smoothScroll from 'smoothscroll-polyfill';

import Header from './Header';
import Body from './Body';
import More from './MoreButton';

import {
  fetchPosts,
  setCurrentPage,
  fetchCategories,
  setActiveCategory,
  setSearchTerm,
  fetchPostMedia,
  setColumnCount,
} from './store/actions';
import effects from './store/effects';
import reducer from './store/reducer';

import { getColumnCount, getPostsUrl } from './utils';
import { StateContext, ActionContext, INITIAL_STATE_CONTEXT } from './Context';

const { Component } = wp.element;

smoothScroll.polyfill();

const StyledContainer = styled.div`
  width: 100%;
`;

class Stories extends Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    categoriesEndpoint: PropTypes.string.isRequired,
    perPage: PropTypes.string,
    mediaEndpoint: PropTypes.string.isRequired,
  };

  static defaultProps = {
    perPage: '12',
  };

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE_CONTEXT;

    this.bodyTop = { scrollIntoView: () => null };

    this.setActiveCategory = this.setActiveCategory.bind(this);
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.getState = this.getState.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.fetchPostMedia = this.fetchPostMedia.bind(this);
    this.setColumnCount = this.setColumnCount.bind(this);
    this.setCurrentPage = this.setCurrentPage.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
    this.dispatch(fetchCategories(this.props.categoriesEndpoint));
    window.addEventListener('resize', this.setColumnCount);
    this.setColumnCount();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.categoryChanged(prevState)) {
      if (this.state.currentPage !== 1) {
        this.dispatch(setCurrentPage(1));
      }
      this.fetchPosts();
      this.bodyTop.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    if (this.searchTermWasCleared(prevState)) {
      if (this.state.currentPage !== 1) {
        this.dispatch(setCurrentPage(1));
      }
      this.fetchPosts();
      return;
    }

    if (this.searchTermChanged(prevState)) {
      if (this.state.searchTerm.length > 2) {
        this.dispatch(setCurrentPage(1));
        this.fetchPosts();
      }
      return;
    }

    if (this.newPageWasAdded(prevState)) {
      this.fetchPosts();
    }
  }

  getDispatchers = () => ({
    setActiveCategory: this.setActiveCategory,
    setSearchTerm: this.setSearchTerm,
    fetchPostMedia: this.fetchPostMedia,
    setCurrentPage: this.setCurrentPage,
  })

  getState = () => ({ ...this.state });

  setActiveCategory(activeCategory) {
    this.dispatch(setActiveCategory(activeCategory));
  }

  setSearchTerm(searchTerm) {
    this.dispatch(setSearchTerm(searchTerm));
  }

  setCurrentPage(currentPage) {
    this.dispatch(setCurrentPage(currentPage));
  }

  setColumnCount() {
    this.dispatch(setColumnCount(getColumnCount()));
  }

  dispatch(action) {
    this.setState(state => reducer(state, action), () => this.triggerEffect(action));
  }

  categoryChanged = prevState => prevState.activeCategory !== this.state.activeCategory
  searchTermWasCleared = prevState => prevState.searchTerm !== '' && this.state.searchTerm === ''
  searchTermChanged = prevState => prevState.searchTerm !== this.state.searchTerm
  newPageWasAdded = prevState => prevState.currentPage !== this.state.currentPage

  fetchPosts() {
    this.dispatch(fetchPosts(getPostsUrl({ ...this.props, ...this.state })));
  }

  fetchPostMedia(postId, featuredMedia) {
    const url = `${this.props.mediaEndpoint.replace(new RegExp('/$'), '')}/${
      featuredMedia
    }`;

    this.dispatch(fetchPostMedia(postId, url));
  }

  triggerEffect(action) {
    if (action.type in effects) {
      effects[action.type](action, {
        dispatch: this.dispatch,
        getState: this.getState,
      });
    }
  }

  render = () => (
    <StateContext.Provider value={this.state}>
      <ActionContext.Provider value={this.getDispatchers()}>
        <StyledContainer>
          <Header />
          <br
            ref={(el) => {
              this.bodyTop = el;
            }}
          />
          <Body />
          <More />
        </StyledContainer>
      </ActionContext.Provider>
    </StateContext.Provider>
  );
}

export default Stories;
