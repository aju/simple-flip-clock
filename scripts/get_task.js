module.exports = function(gulp, plugins, config) {
  return function(task) {
    return require(plugins.path.join(config.projectSrcPath, 'scripts', 'tasks',  task))(gulp, plugins, config);
  };
};
