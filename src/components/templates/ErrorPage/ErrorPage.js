import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import themableWithStyles from 'themableWithStyles';

import styles from './ErrorPage.css';

class ErrorPage extends PureComponent {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    error: null,
  };

  render() {
    const { error } = this.props;

    if (__DEV__ && error) {
      return (
        <div>
          <h1>{error.name}</h1>
          <pre>{error.stack}</pre>
        </div>
      );
    }

    return (
      <div>
        <h1>Error</h1>
        <p>Sorry, a critical error occurred on this page.</p>
      </div>
    );
  }
}

export { ErrorPage as ErrorPageWithoutStyle };
export default themableWithStyles(styles)(ErrorPage);
