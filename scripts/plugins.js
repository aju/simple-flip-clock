const path = require('path');
const plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*', 'run\-sequence', 'webpack']
});

plugins.path = path;

module.exports = plugins;
