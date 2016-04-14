module.exports = function(gulp, plugins, config) {
  return function(done) {
    plugins.livereload.listen();
    return gulp.watch([plugins.path.join(config.sassSrcPath, '**', '*.scss')], ['sass:build']);
  };
};
