const babelEnv = modules => [
  '@babel/preset-env',
  {
    modules,
    targets: '> 0.2%, not dead, not ie < 11'
  }
];

module.exports = (api) => {
  api.cache(true);

  return {
    presets: [babelEnv(false)],
    env: {
      test: {
        presets: [babelEnv('auto')],
      },
      commonjs: {
        presets: [babelEnv('auto')],
      },
      esm: {
        presets: [babelEnv(false)],
        plugins: [['@babel/plugin-transform-runtime', {useESModules: true}]]
      }
    }
  }
};
