const fs = require('fs');

const getCamelCase = (cName) => {
  return cName.replace(new RegExp(/-(.)/, 'g'), (a, b) => {
    return b.toUpperCase();
  });
};

const getClassName = (cName) => {
  return cName.substring(0, 1).toUpperCase() + cName.substring(1);
};

const getFilesInPath = (path) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(files);
    });
  });
};

module.exports = {
  getCamelCase,
  getClassName,
  getFilesInPath
};
