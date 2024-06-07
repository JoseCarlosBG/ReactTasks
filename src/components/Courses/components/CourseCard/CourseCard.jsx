import React from 'react';
import './CourseCard.css';
import PropTypes from 'prop-types';

const CourseCard = ({ course, authors }) => {
  const getAuthorNames = (authorIds) => {
    return authorIds.map(id => {
      const author = authors.find(author => author.id === id);
      return author ? author.name : 'Unknown author';
    }).join(', ');
  };

  return (
    <div className="course-card">
      <h3 className="course-card__title">{course.title}</h3>
      <p className="course-card__description">{course.description}</p>
      <div className="course-card__info">
        <p><strong>Authors:</strong> {getAuthorNames(course.authors)}</p>
        <p><strong>Duration:</strong> {course.duration} hours</p>
        <p><strong>Created:</strong> {course.creationDate}</p>
      </div>
      <div className="course-card__button">
        <button className="button">Show course</button>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    creationDate: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired
};

export default CourseCard;
