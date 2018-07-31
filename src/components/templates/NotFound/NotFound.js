import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import themableWithStyles from 'themableWithStyles';

import styles from './NotFound.css';

@themableWithStyles(styles)
class NotFound extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>{title}</h1>
          <p>Sorry, the page you were trying to view does not exist.</p>
        </div>
      </div>
    );
  }
}

export default NotFound;
