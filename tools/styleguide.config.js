const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const find = require('find');
const { theme, styles } = require('./styleguide/styles');
const pkg = require('../package.json');

const babelrc = require('../babel.config.js');

const ROOT_DIR = path.resolve(__dirname, '..');
const resolvePath = (...args) => path.resolve(ROOT_DIR, ...args);
const SRC_DIR = resolvePath('src');

const reScript = /\.(js|jsx|mjs)$/;
const reStyle = /\.(css|less|styl|scss|sass|sss)$/;
const reImage = /\.(bmp|gif|jpg|jpeg|png|svg)$/;

/**
 * Search for each component in the components,
 * it will look for the package.json to determine which is an actual component.
 */
function listOfUrls(componentFolder) {
  const comp = find.fileSync(
    new RegExp(
      `(?:.*)(?:src/components/${componentFolder}).([A-z.]+).*(package.json)$`,
      'i',
    ),
    ROOT_DIR,
  );

  const list = Object.assign(
    {},
    ...[...comp].map(packagePath => {
      const { name, main } = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      const componentPath = packagePath.replace(
        'package.json',
        main.replace('./', ''),
      );
      return { [name]: componentPath };
    }),
  );
  /* eslint-enable */

  return Object.keys(list).map(val => list[val]);
}

const cacheComponentList = {};

function cacheComponents(compName) {
  if ({}.hasOwnProperty.call(cacheComponentList, compName)) {
    return cacheComponentList[compName];
  }

  cacheComponentList[compName] = listOfUrls(compName);

  return cacheComponentList[compName];
}

const componentList = [
  {
    name: 'Components',
    sections: [
      {
        name: 'Elements',
        components() {
          return cacheComponents('elements');
        },
      },
      {
        name: 'Collections',
        components() {
          return cacheComponents('collections');
        },
      },
      {
        name: 'Views',
        components() {
          return cacheComponents('views');
        },
      },
      {
        name: 'Modules',
        components() {
          return cacheComponents('modules');
        },
      },
      {
        name: 'Behaviors',
        components() {
          return cacheComponents('behaviors');
        },
      },
    ],
  },
];

module.exports = {
  require: ['@babel/polyfill'],
  title: pkg.name,
  version: pkg.version,
  editorConfig: {
    theme: 'dracula', // future config
  },
  theme,
  styles,
  pagePerSection: true,
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.js');

    const componentFolder = 'components';

    const componentTypeFolder = componentPath
      .split(componentFolder)[1]
      .split(name)[0]
      .slice(0, -1);

    return `import { ${name} } from '${componentFolder}${componentTypeFolder}';`;
  },
  // Override Styleguidist components
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/components/Wrapper/Wrapper.js'),
  },
  styleguideDir: path.join(__dirname, '../styleguide'),
  webpackConfig: {
    resolve: {
      // Allow absolute paths in imports, e.g. import Button from 'components/Button'
      // Keep in sync with, .eslintrc, jest.config.js and styleguide.config.js
      modules: ['node_modules', 'src'],
    },
    plugins: [
      // Define free variables
      // https://webpack.js.org/plugins/define-plugin/
      new webpack.DefinePlugin({
        'process.env.BROWSER': true,
        __DEV__: false,
      }),
    ],
    module: {
      rules: [
        {
          test: reScript,
          include: [SRC_DIR, resolvePath('tools')],
          loader: 'babel-loader',
          options: {
            presets: babelrc.presets,
          },
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
          name: 'Terminology',
          content: '../docs/terminology.md',
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
    ...componentList,
  ],
};
