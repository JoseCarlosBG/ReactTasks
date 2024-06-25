import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import { API_ENDPOINTS, STORAGE_KEYS, PATHS } from '../../constants';
import './Courses.css';

const Courses = ({ onAddCourseClick }) => {
  const env = 'http://localhost:4000';
  const [courses, setCourses] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    if (token) {
      navigate(PATHS.COURSES);
    }
    fetchCourses();
    fetchAuthors();
  }, [navigate]);

  const fetchCourses = async (query = '', type = '') => {
    try {
      let response;
      if (query !== '' && type !== '') {
        response = await fetch(`${env + API_ENDPOINTS.FILTER}${type}=${query}`);
      } else {
        response = await fetch(`${env + API_ENDPOINTS.COURSES}`);
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
      const response = await fetch(env + API_ENDPOINTS.AUTHORS);
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
    let courseList = await fetchCourses(term, 'title');
    if (courseList.length === 0) {
      courseList = await fetchCourses(term, 'id');
    }
  };

  const handleAddCourse = () => {
    navigate(PATHS.ADD_COURSE);
    onAddCourseClick();
  };

  const handleShowCourseInfo = (course) => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className="courses">
      <div className="courses__search-bar">
        <SearchBar onSearch={handleSearch} />
        <Button onClick={handleAddCourse}>Add New Course</Button>
      </div>
      <div className="courses__list">
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            authors={authors}
            onShowCourseInfo={handleShowCourseInfo}
          />
        ))}
      </div>
    </div>
  );
};

Courses.propTypes = {
  onAddCourseClick: PropTypes.func.isRequired,
};

export default Courses;
