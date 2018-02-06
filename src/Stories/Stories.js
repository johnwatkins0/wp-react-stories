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

const StyledMoreButtonContainer = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 1.5rem;
`;

const StyledMoreButton = styled.button`
  background: #214280;
  background: var(--primary, #214280);
  border: none;
  border-radius: 2px;
  font-size: 79.4%;
  margin-bottom: 0.5rem;
  margin-right: 0.25rem;
  margin-left: 0.25rem;
  line-height: 1.2;
  text-transform: uppercase;
  padding: 0.5rem 1rem;
  transition: 0.2s background-color;
  cursor: pointer;
  color: white;
  color: var(--color, white);

  &:hover {
    background: #1e3b73;
    background: var(--background-hover-color, #1e3b73);
  }
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
      fetching: true,
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
    // Category has switched.
    if (prevState.activeCategory !== this.state.activeCategory) {
      if (this.state.currentPage !== 1) {
        await this.setCurrentPage(1);
      } else {
        this.fetchPosts();
      }
      return;
    }

    // Search term has become empty.
    if (prevState.searchTerm !== '' && this.state.searchTerm === '') {
      if (this.state.currentPage !== 1) {
        await this.setCurrentPage(1);
      } else {
        this.fetchPosts();
      }
      return;
    }

    // There is a new search term.
    if (prevState.searchTerm !== this.state.searchTerm) {
      if (this.state.searchTerm.length > 2) {
        this.fetchPosts();
      }

      return;
    }

    // A page has been added.
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

    url = `${url}&page=${currentPage}`;

    return url;
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
      canGetMore: totalPages > this.state.currentPage,
      fetching: false,
    });
  }

  render = (
    { categoriesEndpoint, mediaEndpoint } = this.props,
    {
      categories,
      searchTerm,
      fetching,
      activeCategory,
      posts,
      canGetMore,
      currentPage,
    } = this.state
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
        fetching={fetching}
        categories={categories}
        mediaEndpoint={mediaEndpoint}
        scrollToTop={this.scrollToTop}
        canGetMore={canGetMore}
      />
      {canGetMore ? (
        <StyledMoreButtonContainer>
          <StyledMoreButton
            onClick={() => this.setCurrentPage(currentPage + 1)}
          >
            More
          </StyledMoreButton>
        </StyledMoreButtonContainer>
      ) : null}
    </StyledContainer>
  );

  setCategories = this.setCategories.bind(this);
  setActiveCategory = this.setActiveCategory.bind(this);
  setSearchTerm = this.setSearchTerm.bind(this);
  fetchPosts = debounce(this.fetchPosts.bind(this), 500);
  scrollToTop = this.scrollToTop.bind(this);
  setCurrentPage = this.setCurrentPage.bind(this);
}

export default Stories;
