/* eslint-disable global-require */

const pkg = require('../package.json');

module.exports = () => ({
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins: [
    // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
    // https://github.com/postcss/postcss-import
    require('postcss-import')(),
    // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
    // https://github.com/postcss/postcss-custom-properties
    require('postcss-custom-properties')({
      preserve: false,
    }),
    // W3C color() function, e.g. div { background: color(red alpha(90%)); }
    // https://github.com/postcss/postcss-color-function
    require('postcss-color-function')(),
    // // Postcss flexbox bug fixer
    // // https://github.com/luisrudge/postcss-flexbugs-fixes
    require('postcss-flexbugs-fixes')(),
    // // Postcss vmax fixer
    // // https://github.com/jonathantneal/postcss-vmax
    require('postcss-vmax')(),
    // // Postcss object fit image fixer
    // // https://github.com/ronik-design/postcss-object-fit-images
    require('postcss-object-fit-images'),
    // Postcss stages
    // https://github.com/csstools/postcss-preset-env
    require('postcss-preset-env')({
      browsers: pkg.browserslist,
      stage: 0,
    }),
    require('cssnano')({
      preset: [
        'default',
        {
          normalizeUrl: false,
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
});
