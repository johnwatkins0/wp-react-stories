/**
 * Determines the number of columns the app body should have.
 *
 * @param {Object} element The current view.
 * @return {number} The number of columns the app body should have.
 */
export const getColumnCount = (anElement) => {
  const element = anElement || window;

  if (element.innerWidth > 768) {
    return 3;
  }

  if (element.innerWidth > 576) {
    return 2;
  }

  return 1;
};

