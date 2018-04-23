import Stories from './Stories';

const { render } = wp.element;

const loadStories = () => {
  Array.prototype.forEach.call(
    document.querySelectorAll('[data-stories]'),
    (container) => {
      const props = {
        container,
        endpoint: container.getAttribute('data-stories-endpoint'),
        perPage: container.getAttribute('data-per-page') || '12',
        categoriesEndpoint: container.getAttribute('data-categories-endpoint'),
        mediaEndpoint: container.getAttribute('data-media-endpoint'),
      };
      render(<Stories {...props} />, container);
    },
  );
};

loadStories();
