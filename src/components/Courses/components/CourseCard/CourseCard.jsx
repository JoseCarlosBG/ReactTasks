import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCourse } from '../../../../store/courses/actions';
import './CourseCard.css';

const CourseCard = ({ course, authors, onShowCourseInfo }) => {
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.role);

  const getAuthorNames = (authorIds) => {
    return authorIds.map(id => {
      const author = authors.find(author => author.id === id);
      return author ? author.name : 'Unknown author';
    }).join(', ');
  };

  const handleShowCourseInfo = () => {
    onShowCourseInfo(course);
  };

  const handleDeleteCourse = () => {
    dispatch(deleteCourse(course.id));
  };

  const handleUpdateCourse = () => {
    //navigate(`/courses/update/${course.id}`);
    //Implementation for Update course pending
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
      <div className="course-card__buttons">
        <button className="button" onClick={handleShowCourseInfo}>Show course</button>
        {userRole === 'ADMIN' && (
          <>
            <button className="button" onClick={handleUpdateCourse}>Update</button>
            <button className="button" onClick={handleDeleteCourse}>Delete</button>
          </>
        )}
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
  })).isRequired,
  onShowCourseInfo: PropTypes.func.isRequired
};

export default CourseCard;
