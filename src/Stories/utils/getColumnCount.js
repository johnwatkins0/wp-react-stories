/**
 * Determines the number of columns the app body should have.
 *
 * @param {Object} element The current view.
 * @return {number} The number of columns the app body should have.
 */
export const getColumnCount = (element) => {
  if (!element || !element.innerWidth) {
    return 3;
  }

  if ((element.innerWidth || element.clientWidth) > 768) {
    return 3;
  }

  if ((element.innerWidth || element.clientWidth) > 576) {
    return 2;
  }

  return 1;
};

