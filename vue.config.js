// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

const path = require('path');
const webpack = require('webpack');
const version = require('./package.json').version;

// const swPrecache = require('./src/sw-precache.js');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRO = NODE_ENV === 'production';
// const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
// const SwRegisterWebpackPlugin = require('sw-register-webpack-plugin');
// const WebpackPwaManifest = require('webpack-pwa-manifest')
const commonPlugins = [
  new webpack.DefinePlugin({
    __VERSION__: JSON.stringify(version)
  })
];

module.exports = {
  publicPath: IS_PRO ? './' : '/',
  productionSourceMap: IS_PRO,
  css: {
    extract: false,
    loaderOptions: {
      less: {
        // modifyVars
      }
    }
  },
  configureWebpack: () => {
    if (IS_PRO) {
      return {
        plugins: [...commonPlugins,
        // service worker caching
        // new SWPrecacheWebpackPlugin(swPrecache.build),
        // new SwRegisterWebpackPlugin({
        //     filePath: path.resolve(__dirname, './src/sw-register.js')
        // })
        // new WebpackPwaManifest({
        //   name: 'My Progressive Web App',
        //   short_name: 'mobile-web-demo pwa',
        //   description: 'My awesome Progressive Web App!',
        //   background_color: '#ffffff',
        //   crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        //   icons: [
        //     {
        //       src: path.resolve(__dirname, './public/pwa.png'),
        //       sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        //     }
        //   ]
        // })
      ],
        externals: {
          // key 是给 import 的时候用的，value 表示的是如何在 global 中访问到该对象
          // vue: 'Vue',
          // 'vue-router': 'VueRouter'
        }
      };
    } else {
      return {
        plugins: [...commonPlugins]
      };
    }
  },
  devServer: {
    port: 8088, //配置端口
    open: true, //自动开启浏览器
    proxy: {
      '/hk': {
        changeOrigin: true,  //开启代理： 在本地会创建一个虚拟服务端，然后发送请求数据，并且同时接收请求数据，这样客户端和服务端进行数据的交互就不会有跨域问题
        target: 'https://itunes.apple.com/'  // 要访问的跨域的域名
      }
    }
  }
};
