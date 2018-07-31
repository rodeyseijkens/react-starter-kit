import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';

import themableWithStyles from 'themableWithStyles';

import styles from './Layout.css';

import Header from '../../views/Header';
import Footer from '../../views/Footer';
import Feedback from '../../views/Feedback';

@themableWithStyles(styles)
class Layout extends PureComponent {
  static propTypes = {
    contentOnly: PropTypes.bool,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    contentOnly: false,
  };

  render() {
    const { contentOnly, children } = this.props;

    if (contentOnly) return children;

    return (
      <Fragment>
        <Header />
        {children}
        <Feedback />
        <Footer />
      </Fragment>
    );
  }
}

export default Layout;
