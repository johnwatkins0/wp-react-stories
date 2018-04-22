import { getColumnCount } from '..';

test('getColumnCount function', () => {
  global.document.defaultView.clientWidth = 999;
  expect(getColumnCount(global.document.defaultView)).toBe(3);

  global.document.defaultView.clientWidth = 750;
  expect(getColumnCount(global.document.defaultView)).toBe(2);

  global.document.defaultView.clientWidth = 550;
  expect(getColumnCount(global.document.defaultView)).toBe(1);
});
