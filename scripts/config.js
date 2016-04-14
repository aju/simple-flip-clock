const argv = require('yargs').argv;
const path = require('path');
const config = {};

config.projectSrcPath = path.resolve(__dirname, '..');
config.isProductionBuild = argv['production-build'] ? true : false;
config.srcPath =  path.resolve(config.projectSrcPath, 'src');
config.distPath = path.resolve(config.projectSrcPath, 'dist');
config.sassSrcPath = path.resolve(config.srcPath, 'sass');
config.jsSrcPath = path.resolve(config.srcPath, 'js');
config.cssDistPath = path.resolve(config.distPath, 'css');
config.jsDistPath = path.resolve(config.distPath, 'js');

module.exports = config;
