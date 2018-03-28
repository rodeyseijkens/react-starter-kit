import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Switcher from '../Switcher';
import s from './Wrapper.css';
import createSequence from '../../utils/createSequence';

const seq = createSequence();

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
        className={s.toggle}
        value={isTransparent}
        onChange={this.handleBackgroundToggle}
        label="Transparent background"
      />
    );
  }

  render() {
    const wrapperClassName = classNames(
      s.wrapper,
      this.state.isTransparent ? s.transparent : s.white,
    );

    return (
      <div className={s.container}>
        <header className={s.header}>{this.renderBackgroundToggle()}</header>
        <div className={wrapperClassName}>{this.props.children}</div>
      </div>
    );
  }
}

export default Wrapper;
