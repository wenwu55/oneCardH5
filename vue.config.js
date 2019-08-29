module.exports = {
  publicPath: './',
  // module: {
  //   rules: [
  //     {
  //       test: /\.less$/,
  //       loader: "style-loader!css-loader!less-loader"
  //     }
  //   ]
  // }
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less'
    }
  }
}