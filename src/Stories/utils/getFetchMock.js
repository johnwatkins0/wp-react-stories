const headers = { 'X-WP-TOTALPAGES': 999 };

const mockFetchResponse = jsonData => ({
  json: () =>
    new Promise((resolve) => {
      resolve(jsonData);
    }),
  ok: true,
  headers: {
    ...headers,
    get: key => headers[key],
  },
});

export const getFetchMock = data => () =>
  new Promise((resolve) => {
    resolve(mockFetchResponse(data));
  });
