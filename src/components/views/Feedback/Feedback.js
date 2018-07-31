import React, { PureComponent } from 'react';
import themableWithStyles from 'themableWithStyles';

import styles from './Feedback.css';

@themableWithStyles(styles)
class Feedback extends PureComponent {
  render() {
    return (
      <section className={styles.root}>
        <div className={styles.container}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            href="https://gitter.im/kriasoft/react-starter-kit"
          >
            Ask a question
          </a>
          <span className={styles.spacer}>|</span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            href="https://github.com/kriasoft/react-starter-kit/issues/new"
          >
            Report an issue
          </a>
        </div>
      </section>
    );
  }
}

export default Feedback;
