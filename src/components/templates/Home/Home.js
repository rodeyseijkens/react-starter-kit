import React, { PureComponent } from 'react';

import themableWithStyles from 'themableWithStyles';

import styles from './Home.css';

@themableWithStyles(styles)
class Home extends PureComponent {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>
            React Starter Kit — <i>isomorphic</i> web app boilerplate
          </h1>
          <p>
            Development built on top of Node.js, Express and React, containing
            modern web development tools such as Webpack, Babel and Browsersync.
            Helping you to stay productive following the best practices. A solid
            starting point for both professionals and newcomers to the industry.
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
