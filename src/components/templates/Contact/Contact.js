import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import themableWithStyles from 'themableWithStyles';

import styles from './Contact.css';

@themableWithStyles(styles)
class Contact extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>{title}</h1>
          <p>...</p>
        </div>
      </div>
    );
  }
}

export default Contact;
