import React, { PureComponent } from 'react';

import themableWithStyles from 'themableWithStyles';

import styles from './Header.css';

import Link from '../../elements/Link';
import Navigation from '../Navigation';

import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

@themableWithStyles(styles)
class Header extends PureComponent {
  render() {
    return (
      <header className={styles.root}>
        <div className={styles.container}>
          <Navigation />
          <Link className={styles.brand} to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl2x} 2x`}
              width="38"
              height="38"
              alt="React"
            />
            <span className={styles.brandTxt}>Your Company</span>
          </Link>
          <div className={styles.banner}>
            <h1 className={styles.bannerTitle}>React</h1>
            <p className={styles.bannerDesc}>Complex web apps made easy</p>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
