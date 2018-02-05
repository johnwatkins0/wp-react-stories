const MEDIA_CACHE = {};

export const fetchMedia = url =>
  new Promise(async resolve => {
    if (url in MEDIA_CACHE) {
      resolve(MEDIA_CACHE[url]);
      return;
    }

    const response = await fetch(url);
    const json = await response.json();

    MEDIA_CACHE[url] = json;

    resolve(json);
  });
