import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import CourseInfo from '../CourseInfo/CourseInfo';
import { api_endpoints, storageKeys, paths } from '../../constants';
import './Courses.css';

const Courses = ({ onAddCourseClick }) => {
  const [courses, setCourses] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(storageKeys.userToken);
    if (token) {
      navigate(paths.courses);
    }
    fetchCourses();
    fetchAuthors();
  }, [navigate]);

  const fetchCourses = async (query = '', type = '') => {
    try {
      let response;
      if (query!=='' && type!=='') {
        response = await fetch(`${api_endpoints.filter}${type}=${query}`);
      }
      else{
        response = await fetch(`${api_endpoints.courses}`);
      }
      
      if (response.ok) {
        const data = await response.json();
        setCourses(data.result);
      } else {
        console.error('Failed to fetch courses:', response.status);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await fetch(api_endpoints.authors);
      if (response.ok) {
        const data = await response.json();
        setAuthors(data.result);
      } else {
        console.error('Failed to fetch authors:', response.status);
      }
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };
  const handleSearch = async (term) => {
    setSearchTerm(term);
    await fetchCourses(term, 'title');
    if (courses.length === 0) {
      await fetchCourses(term, 'id');
    }
  };

  const handleAddCourse = () => {
    navigate(paths.addCourse);
    onAddCourseClick();
  };

  const handleShowCourseInfo = (course) => {
    setSelectedCourse(course);
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  return (
    <div className="courses">
      <div className="courses__search-bar">
        <SearchBar onSearch={handleSearch} />
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
          courses.map(course => (
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
  onAddCourseClick: PropTypes.func.isRequired,
};

export default Courses;
