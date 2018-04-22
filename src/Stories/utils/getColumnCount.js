/**
 * Determines the number of columns the app body should have.
 *
 * @return {number} The number of columns the app body should have.
 */
export const getColumnCount = () => {
  if (window.innerWidth > 768) {
    return 3;
  }

  if (window.innerWidth > 576) {
    return 2;
  }

  return 1;
};

