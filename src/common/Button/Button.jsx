import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, type, style, className, ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  type: 'button',
  style: {},
  className: '',
};

export default Button;
