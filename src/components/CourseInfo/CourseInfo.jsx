import React from 'react';
import PropTypes from 'prop-types';
import './CourseInfo.css';

const CourseInfo = ({ course, authors, onBack }) => {
  const courseAuthors = course.authors.map((authorId) => {
    const author = authors.find((author) => author.id === authorId);
    return author ? author.name : 'Unknown Author';
  });

  return (
    <div className="course-info-container">
      <h2>{course.title}</h2>
      <p><strong>ID:</strong> {course.id}</p>
      <p><strong>Description:</strong> {course.description}</p>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Creation Date:</strong> {course.creationDate}</p>
      <p><strong>Authors:</strong> {courseAuthors.join(', ')}</p>
      <button onClick={onBack}>Back to courses</button>
    </div>
  );
};

CourseInfo.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    creationDate: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  authors: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default CourseInfo;
