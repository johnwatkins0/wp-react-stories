import { getColumnCount } from '..';

test('getColumnCount function', () => {
  window.innerWidth = 999;
  expect(getColumnCount(global.document.defaultView)).toBe(3);

  window.innerWidth = 750;
  expect(getColumnCount(global.document.defaultView)).toBe(2);

  window.innerWidth = 550;
  expect(getColumnCount(global.document.defaultView)).toBe(1);
});
