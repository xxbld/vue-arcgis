const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//本地方案：复制官方api到/public/ajs目录
const ajsLocalPath = "./ajs";
const ajsOfficialPath = "https://js.arcgis.com/4.11";
const ajsConfigs = {
  official: {
    cssPath: `${ajsOfficialPath}/esri/themes/light/main.css`,
    dojoPath: `${ajsOfficialPath}/dojo`,
    initPath: `${ajsOfficialPath}/dojo/dojo.js`
  },
  local: {
    cssPath: `${ajsLocalPath}/esri/themes/light/main.css`,
    dojoPath: `${ajsLocalPath}/dojo`,
    initPath: `${ajsLocalPath}/init.js`
  }
};
// const ajsConfig = ajsConfigs.local;
const ajsConfig = ajsConfigs.official;
const publicPath = "./";

module.exports = {
  publicPath,
  // outputDir: 'dist',
  productionSourceMap: false, //生产环境关闭SourceMap
  chainWebpack: config => {
    console.log(config.entry);
  },
  configureWebpack: config => {
    return {
      output: {
        libraryTarget: "amd"
      },
      devtool: "source-map",
      externals: [
        (context, request, callback) => {
          if (
            /^dojo/.test(request) ||
            /^dojox/.test(request) ||
            /^dijit/.test(request) ||
            /^esri/.test(request)
          ) {
            return callback(null, `amd ${request}`);
          }
          return callback();
        }
      ],
      plugins: [
        new HtmlWebpackPlugin({
          inject: false,
          chunks: ["vendor", "app", "manifest"],
          template: "public/index.html",
          hash: true,
          filename: "index.html",
          title: "vue arcgis",
          //scripts多个 arcgis js api应该最后引用，否则可能导致multiple define错误
          scripts: [ajsConfig.initPath],
          links: [ajsConfig.cssPath]
        }),
        new webpack.DefinePlugin({
          "process.env": {
            dojoPath: JSON.stringify(ajsConfig.dojoPath),
            publicPath: JSON.stringify(publicPath)
          }
        })
      ]
    };
  }
};
