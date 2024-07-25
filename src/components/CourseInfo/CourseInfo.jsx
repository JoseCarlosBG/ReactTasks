import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getCourseById, getCourseAuthors } from '../../store/selectors';
import { fetchCourseById } from '../../store/courses/thunk';
import './CourseInfo.css';

const CourseInfo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = useSelector((state) => getCourseById(state, courseId));
  const courseAuthors = useSelector((state) => getCourseAuthors(state, course));

  useEffect(() => {
    if (!course) {
      dispatch(fetchCourseById(courseId));
    }
  }, [courseId, course, dispatch]);

  const handleBack = () => {
    navigate('/courses');
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-info-container">
      <h2>{course.title}</h2>
      <p><strong>ID:</strong> {course.id}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Duration:</strong> {course.duration} hours</p>
      <p><strong>Creation Date:</strong> {course.creationDate}</p>
      <p><strong>Authors:</strong> {courseAuthors.join(', ')}</p>
      <button onClick={handleBack}>Back to courses</button>
    </div>
  );
};

CourseInfo.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
};

export default CourseInfo;
