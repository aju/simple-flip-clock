module.exports = function(gulp, plugins, config) {
  return function(done) {
    const webpackConfig = require(plugins.path.join(config.projectSrcPath, 'scripts', 'webpack_config'));

    plugins.webpack(webpackConfig.getConfig(true, plugins, config), webpackConfig.getCallback(null, plugins));
  };
};
