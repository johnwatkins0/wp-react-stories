export const posts = [
  {
    id: 11,
    title: {
      rendered: 'Hello',
    },
    excerpt: {
      rendered: 'Hello, this is the excerpt.',
    },
  },
  {
    id: 12,
    title: {
      rendered: 'My cool post',
    },
    excerpt: {
      rendered: 'Hello, this is a cool post',
    },
    featured_media: 64,
  },
];


export const categories = [
  {
    id: 558,
    name: 'My Category',
  },
  {
    id: 984,
    name: 'My Other Cool Category',
  },
];

export const state = {
  currentPage: 1,
  posts,
  fetching: false,
  categories,
  activeCategory: 0,
  searchTerm: '',
  columnCount: 3,
  canGetMore: true,
};

export const media = {
  id: 64,
  title: 'My Media Object',
};
