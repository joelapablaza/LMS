module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          '@controllers': './src/controllers',
          '@models': './src/models',
          '@routes': './src/routes',
          '@utils': './src/utils',
          '@middlewares': './src/middlewares',
          '@servicesd': './src/services',
        },
      },
    ],
  ],
};
