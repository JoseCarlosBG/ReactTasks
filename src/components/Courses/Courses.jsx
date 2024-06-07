import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import CourseInfo from '../CourseInfo/CourseInfo';
import './Courses.css';

const Courses = ({ courses, authors, onAddCourseClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/courses');
    }
  }, [navigate]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleAddCourse = () => {
    navigate('/courses/add');
    onAddCourseClick();
  };

  const handleShowCourseInfo = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses">
      <div className="courses__search-bar">
        <SearchBar courses={courses} onSearch={handleSearch} />
        <Button onClick={handleAddCourse}>Add New Course</Button>
      </div>
      <div className="courses__list">
        {selectedCourse ? (
          <CourseInfo 
            course={selectedCourse} 
            authors={authors} 
            onBack={handleBackToCourses}
          />
        ) : (
          filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              authors={authors}
              onShowCourseInfo={handleShowCourseInfo}
            />
          ))
        )}
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
