import React, { PureComponent } from 'react';

import themableWithStyles from 'themableWithStyles';

import styles from './Footer.css';

import Link from '../../elements/Link';

@themableWithStyles(styles)
class Footer extends PureComponent {
  render() {
    return (
      <footer className={styles.root}>
        <div className={styles.container}>
          <span className={styles.text}>© Your Company</span>
          <span className={styles.spacer}>·</span>
          <Link className={styles.link} to="/">
            Home
          </Link>
          <span className={styles.spacer}>·</span>
          <Link className={styles.link} to="/not-found">
            Not Found
          </Link>
        </div>
      </footer>
    );
  }
}

export default Footer;
