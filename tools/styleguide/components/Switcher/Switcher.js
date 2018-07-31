import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import themableWithStyles from 'themableWithStyles';

import styles from './Switcher.css';

@themableWithStyles(styles)
class Switcher extends PureComponent {
  input = null;

  static propTypes = {
    /**
     * @ignore
     */
    className: PropTypes.string,
    /**
     * The id of the `input` element.
     */
    id: PropTypes.string.isRequired,
    /**
     * The alternate color for the `error` state
     */
    danger: PropTypes.bool,
    /**
     * If `true`, the switch will be disabled.
     */
    disabled: PropTypes.bool,
    /**
     * The name of the input field
     */
    name: PropTypes.string,
    /**
     * The value of the input field
     */
    value: PropTypes.bool,
    /**
     * The tabindex for keyboard accessibility (a11y)
     */
    tabIndex: PropTypes.number,
    /**
     * The text that can be displayed underneath for the `error` state
     */
    hint: PropTypes.string,
    /**
     * The string before the switch
     */
    description: PropTypes.string,
    /**
     * A string after the switch
     */
    label: PropTypes.string,
    /**
     * Callback fired when the state is changed.
     *
     * @param {boolean} checked The `checked` value of the switch
     * @param {object} event The event source of the callback
     */
    onChange: PropTypes.func.isRequired,
    /**
     * CSS API override all the class names injected
     */
    css: PropTypes.shape({
      root: PropTypes.string,
      label: PropTypes.string,
      hint: PropTypes.string,
      description: PropTypes.string,
      container: PropTypes.string,
      checked: PropTypes.string,
      disabled: PropTypes.string,
      danger: PropTypes.string,
      input: PropTypes.string,
      switcher: PropTypes.string,
    }),
  };

  static defaultProps = {
    className: '',
    name: '',
    hint: '',
    label: '',
    description: '',
    tabIndex: -1,
    value: false,
    danger: false,
    disabled: false,
    css: {
      root: styles.root,
      label: styles.label,
      hint: styles.hint,
      description: styles.description,
      container: styles.container,
      checked: styles.checked,
      disabled: styles.disabled,
      danger: styles.danger,
      input: styles.input,
      switcher: styles.switcher,
    },
  };

  setInput = input => {
    this.input = input;
  };

  handleChange = event => {
    const { disabled, onChange } = this.props;
    if (!disabled) {
      onChange(event.target.checked, event);
    }
  };

  focus() {
    if (this.input) {
      this.input.focus();
    }
  }

  blur() {
    if (this.input) {
      this.input.blur();
    }
  }

  renderLabel() {
    const { label, id, css } = this.props;

    if (!label) {
      return null;
    }

    return (
      <label className={css.label} id={label} htmlFor={id}>
        {label}
      </label>
    );
  }

  renderHint() {
    const { hint, css } = this.props;

    if (!hint) {
      return null;
    }

    return <div className={css.hint} id={hint} />;
  }

  renderDescription() {
    const { description, css } = this.props;

    if (!description) {
      return null;
    }

    return <div className={css.description} id={description} />;
  }

  render() {
    const {
      id,
      value,
      disabled,
      name,
      tabIndex,
      className: classNameProp,
      danger,
      css,
    } = this.props;

    const className = classNames(css.container, classNameProp, {
      [css.checked]: value,
      [css.disabled]: disabled,
      [css.danger]: danger,
    });

    return (
      <div className={css.root}>
        {this.renderDescription()}
        <div className={className}>
          <input
            className={css.input}
            id={id}
            name={name}
            value={value}
            checked={value}
            type="checkbox"
            tabIndex={tabIndex}
            ref={this.setInput}
            onChange={this.handleChange}
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-for */}
          <label htmlFor={id} className={css.switcher} />
          {this.renderLabel()}
        </div>
        {this.renderHint()}
      </div>
    );
  }
}

export default Switcher;
