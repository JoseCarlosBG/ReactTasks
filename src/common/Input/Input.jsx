import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.css'; // Using CSS Modules for scoped styles

const Input = ({ labelText, ...props }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>
        {labelText}
        <input
          className={styles.inputField}
          aria-label={labelText} // Adding aria-label for accessibility
          {...props}
        />
      </label>
    </div>
  );
};

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
};

export default Input;
