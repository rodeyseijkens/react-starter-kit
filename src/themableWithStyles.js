import React, { Component } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import hoistStatics from 'hoist-non-react-statics';

const isSpecialKey = selector => selector === 'compose';

function getDisplayName(DecoratedComponent) {
  return (
    DecoratedComponent.displayName || DecoratedComponent.name || 'Component'
  );
}

function getSelectorsInSetDifference(newCss = {}, origCss = {}) {
  const newSet = Object.keys(newCss);
  const origSet = Object.keys(origCss);
  return newSet
    .filter(selector => origSet.indexOf(selector) === -1)
    .filter(selector => !isSpecialKey(selector));
}

function areSelectorsMatchingSet(newCss, origCss) {
  return getSelectorsInSetDifference(newCss, origCss).length <= 0;
}

const compose = (origCss = {}, newCss = {}) => {
  // make a copy to avoid mutations of nested objects
  // also strip all functions injected by isomorphic-style-loader
  const result = Object.keys(origCss).reduce((acc, key) => {
    const value = origCss[key];
    if (typeof value !== 'function') {
      acc[key] = value;
    }
    return acc;
  }, {});

  // traverse mixin keys and merge them to resulting theme
  Object.keys(newCss).forEach(key => {
    // there's no need to set any defaults here
    const originalValue = result[key];
    const mixinValue = newCss[key];

    switch (typeof mixinValue) {
      case 'object': {
        // possibly nested theme object
        switch (typeof originalValue) {
          case 'object': {
            // exactly nested theme object - go recursive
            result[key] = compose(originalValue, mixinValue);
            break;
          }

          case 'undefined': {
            // original does not contain this nested key - just take it as is
            result[key] = mixinValue;
            break;
          }

          default: {
            // can't merge an object with a non-object
            throw new Error(
              `You are merging object ${key} with a non-object ${originalValue}`,
            );
          }
        }
        break;
      }

      case 'undefined': // fallthrough - handles accidentally unset values which may come from props
      case 'function': {
        // this handles issue when isomorphic-style-loader addes helper functions to css-module
        break; // just skip
      }

      default: {
        // plain values
        switch (typeof originalValue) {
          case 'object': {
            // can't merge a non-object with an object
            throw new Error(
              `You are merging non-object ${mixinValue} with an object ${key}`,
            );
          }

          case 'undefined': {
            // mixin key is new to original theme - take it as is
            result[key] = mixinValue;
            break;
          }
          case 'function': {
            // this handles issue when isomorphic-style-loader addes helper functions to css-module
            break; // just skip
          }

          default: {
            // finally we can merge
            result[key] = originalValue
              .split(' ')
              .concat(mixinValue.split(' '))
              .filter(
                (item, pos, self) => self.indexOf(item) === pos && item !== '',
              )
              .join(' ');
            break;
          }
        }
        break;
      }
    }
  });

  return result;
};

const validate = (origCss, newCss) => {
  invariant(
    areSelectorsMatchingSet(newCss, origCss),
    'Expected "this.props.css" to provide only selectors in the original stylesheet.  These selectors "%s" are not included in the stylesheet keys, "%s".',
    getSelectorsInSetDifference(newCss, origCss),
    Object.keys(origCss),
  );

  invariant(
    areSelectorsMatchingSet(newCss.compose, origCss),
    'Expected "this.props.css.compose" to provide only selectors in the original stylesheet.  These selectors "%s" are not included in the stylesheet keys, "%s".',
    getSelectorsInSetDifference(newCss.compose, origCss),
    Object.keys(origCss),
  );
};

export default function themableWithStyles(origCss = {}) {
  if (typeof origCss !== 'object' || Array.isArray(origCss))
    throw new Error(
      'stylesheet must be an object (ie, export object from a css module)',
    );

  return function decorateSource(DecoratedComponent) {
    class ThemableWithStyles extends Component {
      static displayName = `ThemableWithStyles(${getDisplayName(
        DecoratedComponent,
      )})`;

      static ComposedComponent = process.env.NODE_ENV !== 'production' &&
        DecoratedComponent;

      static defaultProps = {
        ...DecoratedComponent.defaultProps,
        css: {},
      };

      static propTypes = {
        ...DecoratedComponent.propTypes,
        css: PropTypes.shape(),
      };

      static contextTypes = {
        insertCss: PropTypes.func,
      };

      constructor(props, context, ...rest) {
        super(props, context, ...rest);

        const cssProps = [origCss];

        // eslint-disable-next-line no-underscore-dangle
        if (typeof props.css._getCss === 'function') {
          cssProps.push(props.css);
        }

        this.removeCss =
          typeof context.insertCss === 'function'
            ? context.insertCss(...cssProps)
            : null;
      }

      componentWillUnmount() {
        if (this.removeCss) {
          setTimeout(this.removeCss, 0);
        }
      }

      getCss() {
        const newCss = this.props.css || {};
        validate(origCss, newCss);
        return compose(newCss, origCss);
      }

      render() {
        return <DecoratedComponent {...this.props} css={this.getCss()} />;
      }
    }

    return hoistStatics(ThemableWithStyles, DecoratedComponent);
  };
}
