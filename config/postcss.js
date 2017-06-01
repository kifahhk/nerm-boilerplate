module.exports = function plugins(bundler) {
  return [
    require('postcss-import'),
    require('precss'),
    require('autoprefixer')({
      browsers: 'last 2 version',
    })
  ];
};
