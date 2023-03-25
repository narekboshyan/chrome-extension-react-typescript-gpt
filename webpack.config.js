const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const config = {
  entry: {
    popup: path.join(__dirname, 'src/popup.ts'),
    content: path.join(__dirname, 'src/content.tsx'),
    background: path.join(__dirname, 'src/background.ts'),
    backgroundRun: path.join(__dirname, 'src/background_run.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: ['base64-inline-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

module.exports = config;
