import { getColumnCount } from '..';

test('getColumnCount function', () => {
  global.window = global.window || {};

  global.window.innerWidth = 999;
  expect(getColumnCount(global.window)).toBe(3);

  global.window.innerWidth = 750;
  expect(getColumnCount(global.window)).toBe(2);

  global.window.innerWidth = 550;
  expect(getColumnCount(global.window)).toBe(1);

  global.window = null;
  global.window.innerWidth = null;

  global.document.defaultView.clientWidth = 999;
  expect(getColumnCount(global.document.defaultView)).toBe(3);

  global.document.defaultView.clientWidth = 750;
  expect(getColumnCount(global.document.defaultView)).toBe(2);

  global.document.defaultView.clientWidth = 550;
  expect(getColumnCount(global.document.defaultView)).toBe(1);
});
