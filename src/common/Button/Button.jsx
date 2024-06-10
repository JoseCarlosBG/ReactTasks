import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, style, className, ...props }) => {
  return (
    <button
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
  style: PropTypes.object,
  className: PropTypes.string,
};

Button.defaultProps = {
  onClick: () => {},
  style: {},
  className: '',
};

export default Button;
