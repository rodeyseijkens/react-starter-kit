import React, { PureComponent } from 'react';
import themableWithStyles from 'themableWithStyles';

import styles from './Navigation.css';

import Link from '../../elements/Link';

@themableWithStyles(styles)
class Navigation extends PureComponent {
  render() {
    return (
      <nav className={styles.root} role="navigation">
        <Link className={styles.link} to="/about">
          About
        </Link>
        <Link className={styles.link} to="/contact">
          Contact
        </Link>
      </nav>
    );
  }
}

export default Navigation;
