'use strict';

const gulp = require('gulp');
const path = require('path');
const config = require(path.join(__dirname, 'scripts', 'config'));
const plugins = require(path.join(__dirname, 'scripts', 'plugins'));
const getTask = require(path.join(__dirname, 'scripts', 'get_task'))(gulp, plugins, config);

gulp.task('js:build', getTask('js_build'));
gulp.task('js:watch', getTask('js_watch'));

gulp.task('sass:build', getTask('sass_build'));
gulp.task('sass:watch', getTask('sass_watch'));

gulp.task('watch', ['sass:watch', 'js:watch']);
gulp.task('build', ['sass:build', 'js:build']);
