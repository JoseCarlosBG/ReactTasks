import React, { useState, useMemo } from 'react';
import './Courses.css';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';

const Courses = ({ courses, authors, onAddCourseClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredCourses = useMemo(() => {
    return courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [courses, searchTerm]);

  return (
    <div className="courses">
      <div className="courses__search-bar">
        <SearchBar courses={courses} onSearch={handleSearch} />
        <Button onClick={onAddCourseClick}>Add New Course</Button>
      </div>
      <div className="courses__list">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            authors={authors}
          />
        ))}
      </div>
    </div>
  );
};

Courses.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  onAddCourseClick: PropTypes.func.isRequired,
};

export default Courses;
