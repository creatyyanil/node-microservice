const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.ts',
    target: 'node',
    externals: {
      // Don't bundle Node.js built-in modules
      fs: 'commonjs fs',
      path: 'commonjs path',
      util: 'commonjs util',
      stream: 'commonjs stream',
      events: 'commonjs events',
      crypto: 'commonjs crypto',
      os: 'commonjs os',
      child_process: 'commonjs child_process',
      http: 'commonjs http',
      https: 'commonjs https',
      url: 'commonjs url',
      querystring: 'commonjs querystring',
      zlib: 'commonjs zlib',

      // Don't bundle dependencies
      express: 'commonjs express',
      semver: 'commonjs semver',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.json',
                transpileOnly: false,
                compilerOptions: {
                  sourceMap: !isProduction,
                  declaration: false,
                  declarationMap: false,
                  emitDeclarationOnly: false,
                },
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/lib': path.resolve(__dirname, 'src/lib'),
        '@/patterns': path.resolve(__dirname, 'src/patterns'),
        '@/examples': path.resolve(__dirname, 'src/examples'),
      },
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: {
        type: 'commonjs2',
      },
      clean: true,
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: false,
              drop_debugger: true,
            },
            mangle: {
              keep_classnames: true,
              keep_fnames: true,
            },
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),
      ],
    },
    devtool: isProduction ? false : 'source-map',
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    },
    performance: {
      hints: false,
    },
  };
};
