// src/components/CourseInfo/CourseInfo.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById } from '../../store/courses/actions';
import './CourseInfo.css';

const CourseInfo = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.find((course) => course.id === courseId));
  const authors = useSelector((state) => state.authors);

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

  const courseAuthors = course.authors.map((authorId) => {
    const author = authors.find((author) => author.id === authorId);
    return author ? author.name : 'Unknown Author';
  });

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
