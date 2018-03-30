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
      rules: [
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
        {
          test: reImage,
          loader: 'file-loader',
        },
        {
          test: /\.svg$/,
          loader: 'url-loader',
        },
        {
          test: /\.txt$/,
          loader: 'raw-loader',
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
      name: 'Documentation',
      sections: [
        {
          name: 'Getting Started',
          content: '../docs/getting-started.md',
        },
        {
          name: 'Configure text editors',
          content: '../docs/how-to-configure-text-editors.md',
        },
        {
          name: 'React style guide',
          content: '../docs/react-style-guide.md',
        },
        {
          name: 'How to fetch data',
          content: '../docs/how-to-fetch-data.md',
        },
        {
          name: 'Use the local content api',
          content: '../docs/how-to-use-local-content-api.md',
        },
        {
          name: 'Multilanguage',
          content: '../docs/how-to-use-multilanguage.md',
        },
        {
          name: 'Using Redux',
          content: '../docs/how-to-use-redux.md',
        },
        {
          name: 'Routing',
          content: '../docs/how-to-use-routing.md',
        },
        {
          name: 'Build & deploy',
          content: '../docs/how-to-build-and-deploy.md',
        },
        {
          name: 'Recipes',
          sections: [
            {
              name: 'External social service',
              content:
                '../docs/recipes/how-to-integrate-external-social-service.md',
            },
            {
              name: 'Integrate React-Intl',
              content: '../docs/recipes/how-to-integrate-react-intl.md',
            },
            {
              name: 'Integrate Redux',
              content: '../docs/recipes/how-to-integrate-redux.md',
            },
          ],
        },
      ],
    },
    {
      name: 'Components',
      sections: [
        {
          name: 'Elements',
          components: '../src/rsk-components/elements/*/**/*.js',
        },
        {
          name: 'Collections',
          components: '../src/rsk-components/collections/*/**/*.js',
        },
        {
          name: 'Views',
          components: '../src/rsk-components/views/*/**/*.js',
        },
        {
          name: 'Modules',
          components: '../src/rsk-components/modules/*/**/*.js',
        },
        {
          name: 'Behaviors',
          components: '../src/rsk-components/behaviors/*/**/*.js',
        },
        {
          name: 'Addons',
          components: '../src/rsk-components/addons/*/**/*.js',
        },
      ],
    },
  ],
};
