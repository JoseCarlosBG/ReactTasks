import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.css'; // Using CSS Modules for scoped styles

const Input = ({ labelText, type, value, onChange, placeholderText, required }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>
        {labelText}
        <input 
          type={type} 
          className={styles.inputField} 
          placeholder={placeholderText} 
          value={value}
          onChange={onChange} 
          required={required}
          aria-label={labelText} // Adding aria-label for accessibility
        />
      </label>
    </div>
  );
};

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  placeholderText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

Input.defaultProps = {
  type: 'text',
  value: '',
  placeholderText: '',
  required: false,
};

export default Input;
