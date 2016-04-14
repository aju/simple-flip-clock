module.exports = {
  getConfig(watch, plugins, config) {
    watch = watch || false;

    return {
      entry: plugins.path.resolve(config.jsSrcPath, 'main.js'),
      output: {
        path: config.jsDistPath,
        filename: '[name].min.js'
      },
      devtool: config.isProductionBuild ? false : 'source-map',
      module: {
        loaders: [
          {
            test: /\.js?$/,
            include: config.jsSrcPath,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          }
        ]
      },
      watch,
      plugins: config.isProductionBuild ? [
        new plugins.webpack.optimize.UglifyJsPlugin({minimize: true})
      ] : []
    };
  },
  getCallback(done, plugins) {
    return function(err, stats) {
      if (err) {
        throw new plugins.util.PluginError('webpack', err);
      }
      plugins.util.log('[webpack]', stats.toString());
      if(typeof done === 'function') {
        done();
      }
    };
  }
};
