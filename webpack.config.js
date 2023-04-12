import CopyPlugin from 'copy-webpack-plugin';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
  entry: {
    popup: join(__dirname, 'src/popup.tsx'),
    content: join(__dirname, 'src/content.tsx'),
    background: join(__dirname, 'src/background.ts'),
    backgroundRun: join(__dirname, 'src/background_run.ts'),
  },
  output: {
    path: join(__dirname, 'dist'),
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
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
};

export default config;
