// Courses.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import { API_ENDPOINTS, STORAGE_KEYS, PATHS } from '../../constants';
import { fetchCourses } from '../../store/courses/actions'; // Adjust the import path as necessary
import { fetchAuthors } from '../../store/authors/actions'; // Adjust the import path as necessary
import './Courses.css';

const Courses = ({ onAddCourseClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const courses = useSelector((state) => state.courses);
  const authors = useSelector((state) => state.authors);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    if (token) {
      navigate(PATHS.COURSES);
    }
    dispatch(fetchCourses());
    dispatch(fetchAuthors());
  }, [dispatch, navigate]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    dispatch(fetchCourses(term, 'title'));
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
