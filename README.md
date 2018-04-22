# wp-react-stories [![Build Status](https://travis-ci.org/johnwatkins0/wp-react-stories.svg?branch=master)](https://travis-ci.org/johnwatkins0/wp-react-stories)

A React-based, masonry-like display of categorized posts drawn from WordPress REST endpoints.

[Demo.](https://johnwatkins0.github.io/wp-react-stories/demo/)

## Install

### Composer/WordPress

If you plan to use the WordPress shortcode, this library can be installed via Composer or activated as a WordPress plugin. To install via Composer, use:

```
composer require colbycomms/wp-react-stories
```

Note the WordPress parts of this plugin require **PHP 7.1 or higher**.

### From NPM

If you're not using the shortcode and plan to import this library into your ES6 Javascript, install it with npm:

```
npm install wp-react-stories
```

Or:

```
yarn add wp-react-stories
```

## Usage

### In ES6 Javascript

First, if you installed this library using Composer and plan to import the component into your Javascript, you need to prevent the plugin's compiled script from enqueuing. In your WordPress project, add the following filter:

```PHP
add_filter( 'colbycomms__stories__enqueue_script', '__return_false' );
```

Include the `Stories` component in your project, e.g.:

```Javascript
import React from 'react';
import ReactDOM from 'react';
import Stories from 'wp-react-stories';

const myContainer = document.querySelector('#my-container-element');
const myProps = {
    // See below.
}

ReactDOM.render(<Stories {...myProps} />, myContainer);
```

#### Props

##### `endpoint` {string} **required**

The WordPress REST endpoint from which to draw posts, e.g. `http://your-site.com/wp-json/wp/v2/posts/`. Custom endpoints must support the parameters `search`, `page`, `categories`, and `per_page`.

##### `categoriesEndpoint` {string} **required**

The WordPress REST endpoint from which to draw categories, e.g. `http://your-site.com/wp-json/wp/v2/categories/`.

##### `mediaEndpoint` {string} **required**

The WordPress REST endpoint from which to draw media, e.g. `http://your-site.com/wp-json/wp/v2/media/`.

##### perPage {string} **default = 12**

A numeric string for the number of posts to show per page.

### In WordPress

To use this plugin out of the box without any ES6 inclusion, simply install it with Composer or activate it as a plugin, then use this shortcode:

```HTML
[stories endpoint="http://my-site.com/wp-json/wp-v2/posts/"]
```

All the shortcode attributes have defaults (see below), so simply use `[stories]` if all the defaults apply.

#### Shortcode attributes

##### `endpoint` default = `get_bloginfo( 'url' ) . '/wp-json/wp/v2/posts/'`

The WordPress REST endpoint from which to draw posts.

##### `categories-endpoint` default = `get_bloginfo( 'url' ) . '/wp-json/wp/v2/categories/'`

The WordPress REST endpoint from which to draw categories.

##### `media-endpoint` default = `get_bloginfo( 'url' ) . '/wp-json/wp/v2/media/'`

The WordPress REST endpoint from which to draw media files.

##### `per-page` default = `'12'`

The number of posts to show per page.
