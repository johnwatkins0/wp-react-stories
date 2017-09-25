/* eslint react/no-danger: 0 */

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import dateFns from 'date-fns';
import debounce from 'debounce';
import { range } from 'range';
import AnimatedEllipsis from 'react-animated-ellipsis';
import SearchInput from 'colby-react-search-input';

import styles from './Stories.module.scss';

class Stories extends React.Component {
  static propTypes = {
    endpoint: PropTypes.string.isRequired,
    perPage: PropTypes.string,
  };

  static defaultProps = {
    perPage: '12',
  };

  static setColumnCount() {
    let columnCount = 1;
    if (window.innerWidth > 576) {
      columnCount = 2;
    }
    if (window.innerWidth > 768) {
      columnCount = 3;
    }

    return columnCount;
  }

  constructor(props) {
    super(props);

    this.state = {
      activeCategory: window.COLBY_STORIES_ACTIVE_CATEGORY || '0',
      fetching: false,
      postCategories: {},
      columnCount: Stories.setColumnCount(),
      data: {},
      searchTerm: '',
      featuredImages: {},
      fetchUrl: '',
    };

    this.fetchPosts = debounce(this.fetchPosts.bind(this), 500);
    this.renderColumn = this.renderColumn.bind(this);
    this.getPostsForColumn = this.getPostsForColumn.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.fetchCategories = this.fetchCategories.bind(this);
    this.renderPostCategories = this.renderPostCategories.bind(this);
    this.renderBody = this.renderBody.bind(this);
    this.fetchFeaturedMedia = this.fetchFeaturedMedia.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();

    window.addEventListener('resize', () => {
      const columnCount = Stories.setColumnCount();
      if (columnCount !== this.state.columnCount) {
        this.setState({ columnCount });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeCategory !== this.state.activeCategory) {
      this.fetchPosts();
    }

    this.fetchCategories();

    (this.state.data[this.state.fetchUrl]
      ? this.state.data[this.state.fetchUrl].posts
      : []).forEach((post) => {
      this.fetchFeaturedMedia(post.featured_media);
    });
  }

  getPostsForColumn(columnNumber) {
    return this.state.data[this.state.fetchUrl].posts.filter(
      (post, i) => i % this.state.columnCount === columnNumber
    );
  }

  fetchFeaturedMedia(id) {
    if (id === 0 || id in this.state.featuredImages) {
      return;
    }

    const url = `${window.COLBY_REST_URL}wp/v2/media/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }

        return null;
      })
      .then((data) => {
        const featuredImages = Object.assign({}, this.state.featuredImages);
        featuredImages[id] = data;
        this.setState({ featuredImages });
      });
  }

  fetchCategories() {
    if (!this.state.data[this.state.fetchUrl]) {
      return;
    }

    const categories = [];
    this.state.data[this.state.fetchUrl].posts.forEach((post) => {
      post.categories.forEach((category) => {
        if (category in this.state.postCategories) {
          return;
        }

        if (categories.indexOf(category) === -1) {
          categories.push(category);
        }
      });
    });

    if (categories.length) {
      const base = `${window.COLBY_REST_URL}wp/v2/categories/`;
      const url = `${base}?exclude=1&per_page=99`;

      fetch(url).then((response) => response.json()).then((receivedCategories) => {
        const postCategories = Object.assign({}, this.state.postCategories);

        receivedCategories.forEach((category) => {
          postCategories[category.id] = category;
        });

        this.setState({ postCategories });
      });
    }
  }

  fetchPosts() {
    this.setState({ fetching: true }, () => {
      let url = `${this.props.endpoint}&per_page=${this.props.perPage}`;

      if (
        this.state.activeCategory !== '0' &&
        this.state.activeCategory !== null
      ) {
        url = `${url}&categories=${this.state.activeCategory}`;
      }

      if (this.state.searchTerm.length) {
        url = `${url}&search=${this.state.searchTerm}`;
      }

      let page = 1;
      if (url in this.state.data) {
        if (
          this.state.data[url].nextPage >
          this.state.data[url].headers.totalPages
        ) {
          this.setState({ fetchUrl: url, fetching: false });
          return;
        }
        page = this.state.data[url].nextPage;
      }

      let headers;
      fetch(`${url}&page=${page}`)
        .then((response) => {
          const totalPages = Number(response.headers.get('X-WP-TOTALPAGES'));
          headers = {
            totalPages,
          };
          return response.json();
        })
        .then((posts) => {
          const data = Object.assign({}, this.state.data);
          if (data[url]) {
            data[url].posts = data[url].posts.concat(posts);
            data[url].nextPage += 1;
          } else {
            data[url] = { headers, posts, nextPage: 2 };
          }

          this.setState({ data, fetchUrl: url, fetching: false });
        });
    });
  }

  renderBody() {
    if (
      this.state.searchTerm.length &&
      this.state.data[this.state.fetchUrl].posts === 0
    ) {
      return (
        <div className={styles.noResultsContainer}>
          No results for <i>{this.state.searchTerm}</i>
        </div>
      );
    }

    return range(0, this.state.columnCount).map(this.renderColumn);
  }

  renderColumn(columnNumber) {
    return (
      <div key={columnNumber} className={styles.column}>
        {this.getPostsForColumn(columnNumber).map(this.renderPost)}
      </div>
    );
  }

  renderPostCategories(categories, hasFeaturedImage) {
    return (
      <div
        className={`${styles.categoriesContainer}${hasFeaturedImage
          ? ' hasFeaturedImage'
          : ''}`}
      >
        {categories.map((category) => {
          if (!(category in this.state.postCategories)) {
            return null;
          }

          const { id, name, meta } = this.state.postCategories[category];
          return (
            <div
              className={styles.categoryButtonContainer}
              key={id}
              style={{
                backgroundColor: meta.background_color || '#002878',
              }}
            >
              <a
                href={meta.site_url}
                style={{
                  backgroundColor: meta.background_color || '#002878',
                  color: meta.color || '#000',
                }}
                className={`${styles.categoryButton} badge`}
              >
                {name}
              </a>
            </div>
          );
        })}
      </div>
    );
  }

  renderPost(post) {
    let featuredImage = null;
    if (
      post.featured_media in this.state.featuredImages &&
      this.state.featuredImages[post.featured_media] !== null &&
      this.state.featuredImages[post.featured_media].media_details
    ) {
      const data =
        this.state.featuredImages[post.featured_media].media_details.sizes
          .large ||
        this.state.featuredImages[post.featured_media].media_details.sizes
          .medium;
      featuredImage = (
        <img
          className="card-img"
          alt={post.title.rendered}
          src={data.source_url}
          width={data.width}
          height={data.height}
        />
      );
    }

    return (
      <div
        className={[
          styles.item,
          'card',
          featuredImage === null ? '' : styles.hasFeaturedImage,
        ].join(' ')}
        key={post.id}
      >
        {featuredImage}
        <div className="card-body">
          <h3 className="card-title">
            <a
              href={post.link}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
          </h3>
          <date dateTime={post.date}>
            {dateFns.distanceInWords(new Date(), post.date, {
              addSuffix: true,
            })}
          </date>
          <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </div>
        <div className={styles.cardFooter}>
          {this.renderPostCategories(post.categories, !!featuredImage)}
        </div>
      </div>
    );
  }

  render() {
    if (!this.state.data[this.state.fetchUrl]) {
      return null;
    }

    let extra = null;
    if (this.state.fetching === true) {
      extra = (
        <div className={styles.ellipsisContainer}>
          <AnimatedEllipsis />
        </div>
      );
    } else if (
      this.state.data[this.state.fetchUrl].headers.totalPages >=
      this.state.data[this.state.fetchUrl].nextPage
    ) {
      extra = (
        <div className={styles.buttonContainer}>
          <button
            className={`btn btn-primary ${styles.moreButton}`}
            onClick={() => {
              this.fetchPosts();
            }}
          >
            More
          </button>
        </div>
      );
    }

    return (
      <div
        ref={(container) => {
          this.container = container;
        }}
        className={`${styles.Stories}`}
      >
        <div className={styles.storiesHeader}>
          <div className={styles.search}>
            <SearchInput
              placeholder="Search the archive"
              searchTerm={this.state.searchTerm}
              fetching={!!(this.state.searchTerm.length && this.state.fetching)}
              handleSearchTermChange={(searchTerm) => {
                this.setState({ searchTerm }, this.fetchPosts);
              }}
            />
          </div>
          <div className={styles.categories}>
            <label className={styles.categoryLabel} htmlFor="categorySelect">
              <span className={styles.categoryLabelText}>Category</span>
              <select
                id="categorySelect"
                value={this.state.activeCategory}
                onChange={(event) => {
                  this.setState({ activeCategory: event.target.value });
                }}
              >
                <option value={0}>All</option>
                {Object.keys(this.state.postCategories).map((id) =>
                  (<option key={id} value={id}>
                    {this.state.postCategories[id].name}
                  </option>)
                )}
              </select>
            </label>
          </div>
        </div>
        {this.renderBody()}
        {extra}
      </div>
    );
  }
}

const loadStories = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-stories]'),
    (container) => {
      const props = {
        container,
        endpoint: container.getAttribute('data-endpoint'),
        perPage: container.getAttribute('data-per-page') || '12',
      };
      ReactDOM.render(<Stories {...props} />, container);
    }
  );
};

export default Stories;
export { loadStories };
