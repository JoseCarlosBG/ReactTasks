import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import styles from './SearchBar.css'; // Using CSS Modules for scoped styles

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={styles.searchBar}>
      <Input 
        labelText="Search Courses:" 
        placeholder="Enter course title or ID" 
        value={searchTerm} 
        onChange={handleInputChange} 
        aria-label="Search input" 
      />
      <Button onClick={handleSearchClick}>Search</Button>
      <Button onClick={handleClearSearch}>Clear</Button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;
