import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Provider } from 'react-redux';

import Switcher from '../Switcher';
import styles from './Wrapper.css';
import Layout from '../../../../src/components/globals/Layout';

import createSequence from '../../utils/createSequence';
import configureStore from '../../../../src/store/configureStore';

const seq = createSequence();

const store = configureStore({}, { fetch });

class Wrapper extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      isTransparent: false,
    };

    this.id = `background_toggler_${seq.next()}`;
  }

  handleBackgroundToggle = isTransparent => this.setState({ isTransparent });

  renderBackgroundToggle() {
    const { isTransparent } = this.state;

    return (
      <Switcher
        id={this.id}
        name="toggle"
        className={styles.toggle}
        value={isTransparent}
        onChange={this.handleBackgroundToggle}
        label="Transparent background"
      />
    );
  }

  render() {
    const { children } = this.props;
    const { isTransparent } = this.state;

    const wrapperClassName = classNames(
      styles.wrapper,
      isTransparent ? styles.transparent : styles.white,
    );

    return (
      <Provider store={store}>
        <div className={styles.container}>
          <header className={styles.header}>
            {this.renderBackgroundToggle()}
          </header>
          <div className={wrapperClassName}>
            <Layout contentOnly>{children}</Layout>
          </div>
        </div>
      </Provider>
    );
  }
}

export default Wrapper;
