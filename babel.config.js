const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: (name) => `${name}/style/less`
    },
    'vant'
  ]
];

module.exports = {
  plugins,
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}
