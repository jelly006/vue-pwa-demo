// ./__tests__/unit/jest.conf.js
const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname, '../../'), // 类似 webpack.context
  moduleFileExtensions: [ // 类似 webpack.resolve.extensions
    'js',
    'jsx',
    'json',
    'ts',
    'vue',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // 类似 webpack.resolve.alias
  },
  transform: { // 类似 webpack.module.rules
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    // "^.+\\.tsx?$": "ts-jest"
  },
  setupFiles: ['<rootDir>/__tests__/unit/setup'], // 类似 webpack.entry
  coverageDirectory: '<rootDir>/__tests__/unit/coverage', // 类似 webpack.output
  collectCoverageFrom: [ // 类似 webpack 的 rule.include
    // 'src/**/*.{js,vue}',
    'src/**/**/*.{js,vue}',
    'src/**/**/**/*.{js,vue}',
    '!src/main.js',
    '!src/router/index.js',
    '!**/node_modules/**',
  ],
  testURL: 'http://localhost/',
};