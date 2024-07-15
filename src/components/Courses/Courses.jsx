import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import { PATHS } from '../../constants';
import { getCourses, getAuthors } from '../../store/selectors';
import { fetchCourses } from '../../store/courses/actions'; 
import { fetchAuthors } from '../../store/authors/actions'; 
import './Courses.css';

const Courses = ({ onAddCourseClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);
  const token = useSelector((state) => state.user.token);
  const isAuth = useSelector((state) => state.user.isAuth);
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    } else {
      dispatch(fetchCourses(token));
      dispatch(fetchAuthors(token));
    }
  }, [dispatch, navigate, token, isAuth]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    dispatch(fetchCourses(token, term, 'title'));
  };

  const handleAddCourse = () => {
    navigate(PATHS.ADD_COURSE);
    onAddCourseClick();
  };

  const handleShowCourseInfo = (course) => {
    navigate(`/courses/${course.id}`);
  };

  const renderCourses = () => {
    if (courses.length === 0) {
      return searchTerm 
        ? <p>No courses match with the search</p>
        : <p>There are no available courses</p>;
    }

    return courses.map((course) => (
      <CourseCard
        key={course.id}
        course={course}
        authors={authors}
        onShowCourseInfo={handleShowCourseInfo}
      />
    ));
  };

  return (
    <div className="courses">
      <div className="courses__search-bar">
        <SearchBar onSearch={handleSearch} />
        <Button onClick={handleAddCourse}>Add New Course</Button>
      </div>
      <div className="courses__list">
        {renderCourses()}
      </div>
    </div>
  );
};

Courses.propTypes = {
  onAddCourseClick: PropTypes.func.isRequired,
};

export default Courses;
