const wm = require('webpack-merge');
const common = require('./webpack.common');
const outputPath = require('./webpack.common').outputPath;

/**
 * @type {import('webpack').Configuration}
 */
module.exports = wm.merge(common, {
  devtool: 'source-map',
  devServer: {
    contentBase: outputPath,
  },
});
