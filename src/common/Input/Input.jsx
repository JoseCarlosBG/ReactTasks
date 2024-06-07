import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.css'; // Using CSS Modules for scoped styles

const Input = ({ labelText, placeholderText, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>
        {labelText}
        <input 
          type="text" 
          className={styles.inputField} 
          placeholder={placeholderText} 
          onChange={onChange} 
          aria-label={labelText} // Adding aria-label for accessibility
        />
      </label>
    </div>
  );
};

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  placeholderText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  placeholderText: '',
};

export default Input;
