const fs = require('fs');

function getNodeModulesStartingWith(prefix = 'colby-wp-') {
  const files = fs.readdirSync('./node_modules').map(file => {
    if (file.indexOf(prefix) === 0) {
      return `node_modules/${file}`;
    }
  });

  return files.filter(file => file);
}

module.exports = {
  include: getNodeModulesStartingWith('colby-wp-').concat(getNodeModulesStartingWith('wp-')),
  exclude: ['.deploy*', '.git*', 'node_modules/*'],
};
