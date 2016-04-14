module.exports = function(gulp, plugins, config) {
  return function() {
    return gulp.src(plugins.path.join(config.sassSrcPath, '**', '*.scss'))
      .pipe(plugins.if(!config.isProductionBuild, plugins.sourcemaps.init()))
      .pipe(plugins.sass({
        outputStyle: 'compressed',
        includePaths: ['node_modules/']
      })
      .on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions', 'OperaMini >= 5', 'Android >= 4', 'Chrome >= 28', 'Safari >= 7'],
        cascade: false
      }))
      .pipe(plugins.if(!config.isProductionBuild, plugins.sourcemaps.write('.')))
      .pipe(gulp.dest(config.cssDistPath))
      .pipe(plugins.livereload());
  };
};
