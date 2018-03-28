const path = require('path');
const { theme, styles } = require('./styleguide/styles');
const pkg = require('../package.json');

const ROOT_DIR = path.resolve(__dirname, '..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolvePath('src');

const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

module.exports = {
  require: ['@babel/polyfill'],
  title: `${pkg.name} v${pkg.version}`,
  editorConfig: {
    theme: 'dracula', // future config
  },
  theme,
  styles,
  pagePerSection: true,
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');
    return `import { ${name} } from 'components';`;
  },
  // Override Styleguidist components
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/components/Wrapper/Wrapper.js'),
  },
  styleguideDir: path.join(__dirname, '../styleguide'),
  webpackConfig: {
    resolve: {
      // Allow absolute paths in imports, e.g. import Button from 'components/Button'
      // Keep in sync with .flowconfig, .eslintrc, jest.config.js and styleguide.config.js
      modules: ['node_modules', 'src'],
    },
    module: {
      // Make missing exports an error instead of warning
      strictExportPresence: true,

      rules: [
        // Rules for JS / JSX
        {
          test: reScript,
          include: [SRC_DIR, resolvePath('tools')],
          loader: 'babel-loader',
        },
        {
          test: /\.(css|less|styl|scss|sass|sss)$/,
          loader: 'style-loader!css-loader?modules',
        },
        {
          test: /\.(css|less|styl|scss|sass|sss)$/,
          loader: 'postcss-loader',
          options: {
            config: {
              path: './tools/postcss.config.js',
            },
          },
        },

        // Rules for images
        {
          test: reImage,
          loader: 'file-loader',
        },

        // Convert plain text into JS module
        {
          test: /\.txt$/,
          loader: 'raw-loader',
        },

        // Convert Markdown into HTML
        {
          test: /\.md$/,
          loader: path.resolve(__dirname, './lib/markdown-loader.js'),
        },

        // Return public URL for all assets unless explicitly excluded
        // DO NOT FORGET to update `exclude` list when you adding a new loader
        {
          exclude: [reScript, reStyle, reImage, /\.json$/, /\.txt$/, /\.md$/],
          loader: 'file-loader',
        },
      ],
    },
  },
  sections: [
    {
      name: 'Atoms',
      components: '../src/components/atoms/**/*.js',
    },
    {
      name: 'Molecules',
      components: '../src/components/molecules/**/*.js',
    },
    {
      name: 'Organisms',
      components: '../src/components/organisms/**/*.js',
    },
  ],
};
