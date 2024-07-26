import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar/SearchBar';
import CourseCard from './components/CourseCard/CourseCard';
import Button from '../../common/Button/Button';
import { PATHS } from '../../constants';
import { getCourses, getAuthors } from '../../store/selectors';
import { fetchCourses } from '../../store/courses/thunk'; 
import { fetchUserData } from '../../store/user/thunk'; 
import { fetchAuthors } from '../../store/authors/thunk'; 
import './Courses.css';
import EmptyCourseList from '../EmptyCourseList/EmptyCourseList';

const Courses = ({ onAddCourseClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const courses = useSelector(getCourses);
  const authors = useSelector(getAuthors);
  const token = useSelector((state) => state.user.token);
  const userRole = useSelector((state) => state.user.role);

  useEffect(() => {

    if (!token) {
      navigate('/login');
      return;
    }
    
    dispatch(fetchUserData(token));
    dispatch(fetchCourses(token));
    dispatch(fetchAuthors(token));
  }, [dispatch, token]);

  const handleSearch = (term) => {
    dispatch(fetchCourses(token, term, 'title'));
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
        {userRole === 'admin' && <Button onClick={handleAddCourse}>Add New Course</Button>}
      </div>
      {courses.length === 0 ? (
        <EmptyCourseList />
      ) : (
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
      )}
    </div>
  );
};

Courses.propTypes = {
  onAddCourseClick: PropTypes.func.isRequired,
};

export default Courses;