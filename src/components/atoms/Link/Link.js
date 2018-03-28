import React from 'react';
import PropTypes from 'prop-types';
import history from '../../../history';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * Link component for interal linking with the router.
 * If baseUrl is set (in config.js) all links are prefixed with the baseUrl
 */
class Link extends React.Component {
  static propTypes = {
    /** The internal link of the page where you linking to. */
    to: PropTypes.string.isRequired,
    /** The inner childs. */
    children: PropTypes.node.isRequired,
    /** Function that will be fired on click. */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    onClick: null,
  };

  handleClick = event => {
    const { to, onClick } = this.props;

    if (onClick) {
      onClick(event);
    }

    if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return;
    }

    if (event.defaultPrevented === true) {
      return;
    }

    event.preventDefault();
    history.push(to);
  };

  render() {
    const { children, to, ...props } = this.props;

    return (
      <a href={to} {...props} onClick={this.handleClick}>
        {children}
      </a>
    );
  }
}

export default Link;
