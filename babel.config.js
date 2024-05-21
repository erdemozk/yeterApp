module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          components: './src/components',
          '_constants': './src/constants',
          '@hooks': './src/hooks',
          utils: './src/utils',
          elements: './src/elements',
          pageContainers: './src/pageContainers',
          screens: './src/screens',
        },
      },
    ],
  ],
};
