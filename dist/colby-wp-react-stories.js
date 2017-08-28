/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = PropTypes;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadStories = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(15);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dateFns = __webpack_require__(17);

var _dateFns2 = _interopRequireDefault(_dateFns);

var _lodash = __webpack_require__(16);

var _lodash2 = _interopRequireDefault(_lodash);

var _reactAnimatedEllipsis = __webpack_require__(9);

var _reactAnimatedEllipsis2 = _interopRequireDefault(_reactAnimatedEllipsis);

var _colbyReactSearchInput = __webpack_require__(6);

var _colbyReactSearchInput2 = _interopRequireDefault(_colbyReactSearchInput);

var _StoriesModule = __webpack_require__(14);

var _StoriesModule2 = _interopRequireDefault(_StoriesModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-danger: 0 */

var Stories = function (_React$Component) {
  _inherits(Stories, _React$Component);

  _createClass(Stories, null, [{
    key: 'setColumnCount',
    value: function setColumnCount() {
      var columnCount = 1;
      if (window.innerWidth > 576) {
        columnCount = 2;
      }
      if (window.innerWidth > 768) {
        columnCount = 3;
      }
      if (window.innerWidth > 992) {
        columnCount = 4;
      }

      return columnCount;
    }
  }]);

  function Stories(props) {
    _classCallCheck(this, Stories);

    var _this = _possibleConstructorReturn(this, (Stories.__proto__ || Object.getPrototypeOf(Stories)).call(this, props));

    _this.state = {
      activeCategory: window.COLBY_STORIES_ACTIVE_CATEGORY || '0',
      fetching: false,
      postCategories: {},
      columnCount: Stories.setColumnCount(),
      data: {},
      searchTerm: '',
      featuredImages: {},
      fetchUrl: ''
    };

    _this.fetchPosts = _lodash2.default.debounce(_this.fetchPosts.bind(_this), 500);
    _this.renderColumn = _this.renderColumn.bind(_this);
    _this.getPostsForColumn = _this.getPostsForColumn.bind(_this);
    _this.renderPost = _this.renderPost.bind(_this);
    _this.fetchCategories = _this.fetchCategories.bind(_this);
    _this.renderPostCategories = _this.renderPostCategories.bind(_this);
    _this.renderBody = _this.renderBody.bind(_this);
    _this.fetchFeaturedMedia = _this.fetchFeaturedMedia.bind(_this);
    return _this;
  }

  _createClass(Stories, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.fetchPosts();

      window.addEventListener('resize', function () {
        var columnCount = Stories.setColumnCount();
        if (columnCount !== _this2.state.columnCount) {
          _this2.setState({ columnCount: columnCount });
        }
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      if (prevState.activeCategory !== this.state.activeCategory) {
        this.fetchPosts();
      }

      this.fetchCategories();

      (this.state.data[this.state.fetchUrl] ? this.state.data[this.state.fetchUrl].posts : []).forEach(function (post) {
        _this3.fetchFeaturedMedia(post.featured_media);
      });
    }
  }, {
    key: 'getPostsForColumn',
    value: function getPostsForColumn(columnNumber) {
      var _this4 = this;

      return this.state.data[this.state.fetchUrl].posts.filter(function (post, i) {
        return i % _this4.state.columnCount === columnNumber;
      });
    }
  }, {
    key: 'fetchFeaturedMedia',
    value: function fetchFeaturedMedia(id) {
      var _this5 = this;

      if (id === 0 || id in this.state.featuredImages) {
        return;
      }

      var url = window.COLBY_REST_URL + 'wp/v2/media/' + id;

      fetch(url).then(function (response) {
        if (response.ok === true) {
          return response.json();
        }

        return null;
      }).then(function (data) {
        var featuredImages = Object.assign({}, _this5.state.featuredImages);
        featuredImages[id] = data;
        _this5.setState({ featuredImages: featuredImages });
      });
    }
  }, {
    key: 'fetchCategories',
    value: function fetchCategories() {
      var _this6 = this;

      if (!this.state.data[this.state.fetchUrl]) {
        return;
      }

      var categories = [];
      this.state.data[this.state.fetchUrl].posts.forEach(function (post) {
        post.categories.forEach(function (category) {
          if (category in _this6.state.postCategories) {
            return;
          }

          if (categories.indexOf(category) === -1) {
            categories.push(category);
          }
        });
      });

      if (categories.length) {
        var base = window.COLBY_REST_URL + 'wp/v2/categories/';
        var url = base + '?exclude=1&per_page=99';

        fetch(url).then(function (response) {
          return response.json();
        }).then(function (receivedCategories) {
          var postCategories = Object.assign({}, _this6.state.postCategories);

          receivedCategories.forEach(function (category) {
            postCategories[category.id] = category;
          });

          _this6.setState({ postCategories: postCategories });
        });
      }
    }
  }, {
    key: 'fetchPosts',
    value: function fetchPosts() {
      var _this7 = this;

      this.setState({ fetching: true }, function () {
        var url = _this7.props.endpoint + '&per_page=' + _this7.props.perPage;

        if (_this7.state.activeCategory !== '0' && _this7.state.activeCategory !== null) {
          url = url + '&categories=' + _this7.state.activeCategory;
        }

        if (_this7.state.searchTerm.length) {
          url = url + '&search=' + _this7.state.searchTerm;
        }

        var page = 1;
        if (url in _this7.state.data) {
          if (_this7.state.data[url].nextPage > _this7.state.data[url].headers.totalPages) {
            _this7.setState({ fetchUrl: url, fetching: false });
            return;
          }
          page = _this7.state.data[url].nextPage;
        }

        var headers = void 0;
        fetch(url + '&page=' + page).then(function (response) {
          var totalPages = Number(response.headers.get('X-WP-TOTALPAGES'));
          headers = {
            totalPages: totalPages
          };
          return response.json();
        }).then(function (posts) {
          var data = Object.assign({}, _this7.state.data);
          if (data[url]) {
            data[url].posts = data[url].posts.concat(posts);
            data[url].nextPage += 1;
          } else {
            data[url] = { headers: headers, posts: posts, nextPage: 2 };
          }

          _this7.setState({ data: data, fetchUrl: url, fetching: false });
        });
      });
    }
  }, {
    key: 'renderBody',
    value: function renderBody() {
      if (this.state.searchTerm.length && this.state.data[this.state.fetchUrl].posts === 0) {
        return _react2.default.createElement(
          'div',
          { className: _StoriesModule2.default.noResultsContainer },
          'No results for ',
          _react2.default.createElement(
            'i',
            null,
            this.state.searchTerm
          )
        );
      }

      return _lodash2.default.range(0, this.state.columnCount).map(this.renderColumn);
    }
  }, {
    key: 'renderColumn',
    value: function renderColumn(columnNumber) {
      return _react2.default.createElement(
        'div',
        { key: columnNumber, className: _StoriesModule2.default.column },
        this.getPostsForColumn(columnNumber).map(this.renderPost)
      );
    }
  }, {
    key: 'renderPostCategories',
    value: function renderPostCategories(categories, hasFeaturedImage) {
      var _this8 = this;

      return _react2.default.createElement(
        'div',
        {
          className: '' + _StoriesModule2.default.categoriesContainer + (hasFeaturedImage ? ' hasFeaturedImage' : '')
        },
        categories.map(function (category) {
          if (!(category in _this8.state.postCategories)) {
            return null;
          }

          var _state$postCategories = _this8.state.postCategories[category],
              id = _state$postCategories.id,
              name = _state$postCategories.name,
              meta = _state$postCategories.meta;

          return _react2.default.createElement(
            'div',
            { className: _StoriesModule2.default.categoryButtonContainer, key: id },
            _react2.default.createElement(
              'a',
              {
                href: meta.site_url,
                style: {
                  backgroundColor: meta.background_color || '#002878',
                  color: meta.color || '#000'
                },
                className: _StoriesModule2.default.categoryButton + ' badge'
              },
              name
            )
          );
        })
      );
    }
  }, {
    key: 'renderPost',
    value: function renderPost(post) {
      var featuredImage = null;
      if (post.featured_media in this.state.featuredImages && this.state.featuredImages[post.featured_media] !== null && this.state.featuredImages[post.featured_media].media_details) {
        var data = this.state.featuredImages[post.featured_media].media_details.sizes.large || this.state.featuredImages[post.featured_media].media_details.sizes.medium;
        featuredImage = _react2.default.createElement('img', {
          className: 'card-img',
          alt: post.title.rendered,
          src: data.source_url,
          width: data.width,
          height: data.height
        });
      }

      return _react2.default.createElement(
        'div',
        {
          className: [_StoriesModule2.default.item, 'card', featuredImage === null ? '' : _StoriesModule2.default.hasFeaturedImage].join(' '),
          key: post.id
        },
        featuredImage,
        _react2.default.createElement(
          'div',
          { className: 'card-body' },
          _react2.default.createElement(
            'h3',
            { className: 'card-title' },
            _react2.default.createElement('a', {
              href: post.link,
              dangerouslySetInnerHTML: { __html: post.title.rendered }
            })
          ),
          _react2.default.createElement(
            'date',
            { dateTime: post.date },
            _dateFns2.default.distanceInWords(new Date(), post.date, {
              addSuffix: true
            })
          ),
          _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: post.excerpt.rendered } })
        ),
        _react2.default.createElement(
          'div',
          { className: _StoriesModule2.default.cardFooter },
          this.renderPostCategories(post.categories, !!featuredImage)
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      if (!this.state.data[this.state.fetchUrl]) {
        return null;
      }

      var extra = null;
      if (this.state.fetching === true) {
        extra = _react2.default.createElement(
          'div',
          { className: _StoriesModule2.default.ellipsisContainer },
          _react2.default.createElement(_reactAnimatedEllipsis2.default, null)
        );
      } else if (this.state.data[this.state.fetchUrl].headers.totalPages >= this.state.data[this.state.fetchUrl].nextPage) {
        extra = _react2.default.createElement(
          'div',
          { className: _StoriesModule2.default.buttonContainer },
          _react2.default.createElement(
            'button',
            {
              className: 'btn btn-primary ' + _StoriesModule2.default.moreButton,
              onClick: function onClick() {
                _this9.fetchPosts();
              }
            },
            'More'
          )
        );
      }

      return _react2.default.createElement(
        'div',
        {
          ref: function ref(container) {
            _this9.container = container;
          },
          className: '' + _StoriesModule2.default.Stories
        },
        _react2.default.createElement(
          'div',
          { className: _StoriesModule2.default.storiesHeader },
          _react2.default.createElement(
            'div',
            { className: _StoriesModule2.default.search },
            _react2.default.createElement(_colbyReactSearchInput2.default, {
              placeholder: 'Search the archive',
              searchTerm: this.state.searchTerm,
              fetching: !!(this.state.searchTerm.length && this.state.fetching),
              handleSearchTermChange: function handleSearchTermChange(searchTerm) {
                _this9.setState({ searchTerm: searchTerm }, _this9.fetchPosts);
              }
            })
          ),
          _react2.default.createElement(
            'div',
            { className: _StoriesModule2.default.categories },
            _react2.default.createElement(
              'label',
              { className: _StoriesModule2.default.categoryLabel, htmlFor: 'categorySelect' },
              _react2.default.createElement(
                'span',
                { className: _StoriesModule2.default.categoryLabelText },
                'Category'
              ),
              _react2.default.createElement(
                'select',
                {
                  id: 'categorySelect',
                  value: this.state.activeCategory,
                  onChange: function onChange(event) {
                    _this9.setState({ activeCategory: event.target.value });
                  }
                },
                _react2.default.createElement(
                  'option',
                  { value: 0 },
                  'All'
                ),
                Object.keys(this.state.postCategories).map(function (id) {
                  return _react2.default.createElement(
                    'option',
                    { key: id, value: id },
                    _this9.state.postCategories[id].name
                  );
                })
              )
            )
          )
        ),
        this.renderBody(),
        extra
      );
    }
  }]);

  return Stories;
}(_react2.default.Component);

Stories.propTypes = {
  endpoint: _propTypes2.default.string.isRequired,
  perPage: _propTypes2.default.string
};
Stories.defaultProps = {
  perPage: '12'
};


var loadStories = function loadStories() {
  Array.prototype.forEach.call(document.querySelectorAll('[data-stories]'), function (container) {
    var props = {
      container: container,
      endpoint: container.getAttribute('data-endpoint'),
      perPage: container.getAttribute('data-per-page') || '12'
    };
    _reactDom2.default.render(_react2.default.createElement(Stories, props), container);
  });
};

exports.default = Stories;
exports.loadStories = loadStories;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    "use strict";

    function AE(config) {
        this.className = config && config.className || 'animated-ellipsis';
        this.style = config && config.style || undefined;
        this.spacing = config && config.spacing || '0.1rem';
        this.fontSize = config && config.fontSize || '2rem';
        this.marginLeft = config && config.marginLeft || '0.1rem';
        this.steps = 3;
        this.duration = 2;
        this.perDelay = 0.2;

        this.insertStyleNode();
    }

    AE.prototype.insertStyleNode = function () {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = ' \
            @-webkit-keyframes animated-ellipsis { \
                0%   { opacity: 0; } \
                50%  { opacity: 0; } \
                100% { opacity: 1; } \
            } \
            @keyframes animated-ellipsis { \
                0%   { opacity: 0; } \
                50%  { opacity: 0; } \
                100% { opacity: 1; } \
            }';
        this.style = document.getElementsByTagName('head')[0].appendChild(style);
    };

    var AnimatedEllipsis = new AE();

    function animate(elem) {
        var wrapper = elem;
        var steps = AnimatedEllipsis.steps;
        var perDelay = AnimatedEllipsis.perDelay;
        var marginLeft = wrapper.dataset.marginLeft || AnimatedEllipsis.marginLeft;
        var spacing = wrapper.dataset.spacing || AnimatedEllipsis.spacing;

        wrapper.style.marginLeft = marginLeft;
        wrapper.style.fontSize = AnimatedEllipsis.fontSize;

        for (var iStep = 0; iStep < steps; ++iStep) {
            var elemSpan = document.createElement('span');
            var delay = iStep * perDelay;

            elemSpan.className = '.$step' + iStep;
            elemSpan.innerHTML = '.';
            var cssText = '\
                opacity: 0; \
                -webkit-animation: animated-ellipsis ' + AnimatedEllipsis.duration + 's infinite; \
                animation: animated-ellipsis ' + AnimatedEllipsis.duration + 's infinite; \
                -webkit-animation-delay: ' + delay + 's; \
                animation-delay: ' + delay + 's; \
            ';

            if (iStep !== 0) {
                cssText += 'margin-left: ' + spacing + ';';
            }

            elemSpan.style.cssText = cssText;
            elemSpan = wrapper.appendChild(elemSpan);
        }
    }

    window.HTMLElement.prototype.animateEllipsis = function () {
        animate(this);
    };

    window.NodeList.prototype.animateEllipsis = function () {
        for (var iNode = 0; iNode < this.length; ++iNode) {
            var elem = this[iNode];
            animate(elem);
        }
    };

    window.HTMLElement.prototype.stopAnimatingEllipsis = function () {
        var wrapper = this;
        while (wrapper.hasChildNodes()) {
            wrapper.removeChild(wrapper.lastChild);
        }

        delete wrapper.style.marginLeft;
    };

    module.exports = AnimatedEllipsis;
})();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AnimatedEllipsis;

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _ellipsis = __webpack_require__(13);

var _ellipsis2 = _interopRequireDefault(_ellipsis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AnimatedEllipsis() {
  return _react2.default.createElement(
    'div',
    { className: _ellipsis2.default.ellipsis },
    _react2.default.createElement(
      'span',
      null,
      '.'
    ),
    _react2.default.createElement(
      'span',
      null,
      '.'
    ),
    _react2.default.createElement(
      'span',
      null,
      '.'
    )
  );
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _colbyReactAnimatedEllipsis = __webpack_require__(4);

var _colbyReactAnimatedEllipsis2 = _interopRequireDefault(_colbyReactAnimatedEllipsis);

var _searchIcon = __webpack_require__(7);

var _searchIcon2 = _interopRequireDefault(_searchIcon);

var _defaultsModule = __webpack_require__(12);

var _defaultsModule2 = _interopRequireDefault(_defaultsModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchInput = function SearchInput(_ref) {
  var optionsComponents = _ref.optionsComponents,
      optionsPlacement = _ref.optionsPlacement,
      id = _ref.id,
      placeholderText = _ref.placeholderText,
      searchTerm = _ref.searchTerm,
      handleSearchTermChange = _ref.handleSearchTermChange,
      fetching = _ref.fetching,
      styles = _ref.styles;
  return _react2.default.createElement(
    'div',
    { className: styles.container },
    optionsComponents && optionsPlacement === 'top' ? _react2.default.createElement(
      'div',
      { className: styles.optionsContainer },
      optionsComponents
    ) : null,
    _react2.default.createElement(
      'label',
      { htmlFor: id, className: styles.label },
      _react2.default.createElement(
        'span',
        { className: styles['label-name'] },
        placeholderText
      ),
      _react2.default.createElement('input', {
        id: id,
        className: styles.input,
        placeholder: placeholderText,
        type: 'search',
        value: searchTerm,
        onChange: function onChange(event) {
          handleSearchTermChange(event.target.value);
        }
      }),
      _react2.default.createElement(
        'span',
        { className: styles.feedback },
        fetching === true ? _react2.default.createElement(_colbyReactAnimatedEllipsis2.default, null) : _searchIcon2.default
      )
    ),
    optionsComponents && optionsPlacement === 'bottom' ? _react2.default.createElement(
      'div',
      { className: styles.optionsContainer },
      optionsComponents
    ) : null
  );
};

SearchInput.defaultProps = {
  fetching: false,
  id: Math.random().toString(36).substr(2, 5),
  optionsComponents: null,
  optionsPlacement: 'bottom',
  placeholderText: 'Search',
  styles: _defaultsModule2.default
};

SearchInput.propTypes = {
  handleSearchTermChange: _propTypes2.default.func.isRequired,
  searchTerm: _propTypes2.default.string.isRequired,

  fetching: _propTypes2.default.bool,
  id: _propTypes2.default.string,
  optionsComponents: _propTypes2.default.arrayOf(_propTypes2.default.any),
  optionsPlacement: _propTypes2.default.oneOf(['top', 'bottom']),
  placeholderText: _propTypes2.default.string,
  styles: _propTypes2.default.objectOf(_propTypes2.default.any)
};

exports.default = SearchInput;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SearchInput = __webpack_require__(5);

var _SearchInput2 = _interopRequireDefault(_SearchInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _SearchInput2.default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var searchIcon = _react2.default.createElement(
  "svg",
  {
    width: "1792",
    height: "1792",
    viewBox: "0 0 1792 1792",
    xmlns: "http://www.w3.org/2000/svg"
  },
  _react2.default.createElement("path", {
    d: "M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z",
    fill: "currentColor"
  })
); /* eslint max-len: 0 */

exports.default = searchIcon;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

__webpack_require__(3);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ReactAnimatedEllipsis = function (_React$Component) {
  _inherits(ReactAnimatedEllipsis, _React$Component);

  function ReactAnimatedEllipsis() {
    _classCallCheck(this, ReactAnimatedEllipsis);

    return _possibleConstructorReturn(this, (ReactAnimatedEllipsis.__proto__ || Object.getPrototypeOf(ReactAnimatedEllipsis)).apply(this, arguments));
  }

  _createClass(ReactAnimatedEllipsis, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.wrapper.animateEllipsis();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.wrapper.stopAnimatingEllipsis();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          marginLeft = _props.marginLeft,
          spacing = _props.spacing,
          fontSize = _props.fontSize;

      if (fontSize) {
        style.fontSize = fontSize;
      }

      return _react2.default.createElement('span', {
        ref: function ref(_ref) {
          return _this2.wrapper = _ref;
        },
        className: className,
        style: style,
        'data-margin-left': marginLeft,
        'data-spacing': spacing });
    }
  }]);

  return ReactAnimatedEllipsis;
}(_react2.default.Component);

ReactAnimatedEllipsis.propTypes = {
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  fontSize: _propTypes2.default.string,
  marginLeft: _propTypes2.default.string,
  spacing: _propTypes2.default.string
};

ReactAnimatedEllipsis.defaultProps = {
  style: {},
  className: '',
  fontSize: '2rem',
  marginLeft: '0.1rem',
  spacing: '0.1rem'
};

exports.default = ReactAnimatedEllipsis;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(8);

/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Stories = __webpack_require__(2);

window.addEventListener('load', _Stories.loadStories);

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"container","optionsContainer":"optionsContainer","label":"label","feedback":"feedback","label-name":"label-name","input":"input"};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"ellipsis":"ellipsis","blink":"blink"};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"Stories":"Stories","column":"column","item":"item","hasFeaturedImage":"hasFeaturedImage","categoriesContainer":"categoriesContainer","categoryButtonContainer":"categoryButtonContainer","categories":"categories","categoryButton":"categoryButton","cardFooter":"cardFooter","storiesHeader":"storiesHeader","categoryLabelText":"categoryLabelText","ellipsisContainer":"ellipsisContainer","buttonContainer":"buttonContainer"};

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = dateFns;

/***/ })
/******/ ]);
//# sourceMappingURL=colby-wp-react-stories.js.map