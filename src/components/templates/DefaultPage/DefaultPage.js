import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import themableWithStyles from 'themableWithStyles';

import styles from './DefaultPage.css';

@themableWithStyles(styles)
class Page extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
  };

  render() {
    const { title, html } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <h1>{title}</h1>
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    );
  }
}

export default Page;
