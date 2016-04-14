module.exports = function(gulp, plugins, config) {
  return function(done) {
    const webpackConfig = require(plugins.path.join(config.projectSrcPath, 'scripts', 'webpack_config'));

    plugins.webpack(webpackConfig.getConfig(false, plugins, config), webpackConfig.getCallback(done, plugins));
  };
};
