import React from 'react';
import ReactDOM from 'react-dom';
import Stories from '../..';

const loadStories = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-stories]'),
    container => {
      const props = {
        container,
        endpoint: container.getAttribute('data-stories-endpoint'),
        perPage: container.getAttribute('data-per-page') || '12',
        categoriesEndpoint: container.getAttribute('data-categories-endpoint'),
        mediaEndpoint: container.getAttribute('data-media-endpoint'),
      };
      ReactDOM.render(<Stories {...props} />, container);
    }
  );
};

loadStories();
