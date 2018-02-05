/* eslint react/no-danger: 0 */

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import debounce from 'debounce';
import smoothScroll from 'smoothscroll-polyfill';

import { fetchPosts } from './utils/fetchPosts';
import { Header } from './Header';
import Body from './Body';

smoothScroll.polyfill();

const StyledContainer = styled.div`
  width: 100%;
`;

class Stories extends React.Component {
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

    this.state = {
      activeCategory: '0',
      fetching: false,
      categories: [],
      posts: [],
      searchTerm: '',
      featuredImages: {},
      currentPage: 1,
      canGetMore: false,
    };
  }

  componentDidMount() {
    this.fetchPosts();
    this.fetchCategories();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.activeCategory !== this.state.activeCategory) {
      this.fetchPosts();
      return;
    }

    if (prevState.searchTerm !== '' && this.state.searchTerm === '') {
      this.setCurrentPage(1);
      this.fetchPosts();
      return;
    }

    if (prevState.searchTerm !== this.state.searchTerm) {
      if (this.state.searchTerm.length > 2) {
        this.fetchPosts();
      }

      return;
    }

    if (prevState.currentPage !== this.state.currentPage) {
      this.fetchPosts();
    }
  }

  getPostsUrl(
    { endpoint, perPage } = this.props,
    { activeCategory, searchTerm, currentPage } = this.state
  ) {
    const separator = endpoint.indexOf('?') === -1 ? '?' : '&';
    let url = `${endpoint}${separator}per_page=${perPage}`;

    if (activeCategory !== '0' && activeCategory !== null) {
      url = `${url}&categories=${activeCategory}`;
    }

    if (searchTerm.length) {
      url = `${url}&search=${searchTerm}`;
    }

    return `${url}&paged=${currentPage}`;
  }

  setCurrentPage = currentPage =>
    new Promise(resolve => {
      this.setState({ currentPage }, resolve);
    });

  setCategories = categories =>
    new Promise(resolve => {
      this.setState({ categories }, resolve);
    });

  setActiveCategory = activeCategory =>
    new Promise(resolve => {
      this.setState({ activeCategory }, resolve);
    });

  setSearchTerm = searchTerm =>
    new Promise(resolve => {
      this.setState({ searchTerm }, resolve);
    });

  scrollToTop() {
    this.bodyTop.scrollIntoView({ behavior: 'smooth' });
  }

  async fetchCategories() {
    const response = await fetch(this.props.categoriesEndpoint);
    const categories = await response.json();

    this.setCategories(categories);
  }

  startFetchingPosts = () =>
    new Promise(resolve => {
      this.setState({ fetching: true }, resolve);
    });

  async fetchPosts() {
    await this.startFetchingPosts();
    const url = this.getPostsUrl();
    const { posts, totalPages } = await fetchPosts(url);

    this.setState({
      posts:
        this.state.currentPage > 1 ? this.state.posts.concat(posts) : posts,
      fetching: false,
    });
  }

  render = (
    { categoriesEndpoint, mediaEndpoint } = this.props,
    { categories, searchTerm, fetching, activeCategory, posts } = this.state
  ) => (
    <StyledContainer>
      <Header
        categoriesEndpoint={categoriesEndpoint}
        setActiveCategory={this.setActiveCategory}
        activeCategory={activeCategory}
        categories={categories}
        searchTerm={searchTerm}
        setSearchTerm={this.setSearchTerm}
        fetching={fetching}
      />
      <br
        ref={el => {
          this.bodyTop = el;
        }}
      />
      <Body
        setActiveCategory={this.setActiveCategory}
        searchTerm={searchTerm}
        posts={posts}
        categories={categories}
        mediaEndpoint={mediaEndpoint}
        scrollToTop={this.scrollToTop}
      />
    </StyledContainer>
  );

  setCategories = this.setCategories.bind(this);
  setActiveCategory = this.setActiveCategory.bind(this);
  setSearchTerm = this.setSearchTerm.bind(this);
  fetchPosts = debounce(this.fetchPosts.bind(this), 500);
  scrollToTop = this.scrollToTop.bind(this);
}

export default Stories;
