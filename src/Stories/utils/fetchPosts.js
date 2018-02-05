const POSTS_CACHE = {};

export const fetchPosts = url =>
  new Promise(async resolve => {
    if (url in POSTS_CACHE) {
      resolve(POSTS_CACHE[url]);
      return;
    }

    const response = await fetch(url);
    const totalPages = Number(response.headers.get('X-WP-TOTALPAGES'));
    const posts = await response.json();
    const data = { posts, totalPages };
    POSTS_CACHE[url] = data;
    resolve(data);
  });
