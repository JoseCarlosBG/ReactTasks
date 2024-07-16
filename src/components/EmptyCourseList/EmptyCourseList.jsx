import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../common/Button/Button';
import './EmptyCourseList.css';

const EmptyCourseList = ({ onAddCourseClick }) => {
  return (
    <div className="empty-course-list">
      <h2>Course List is Empty</h2>
      <p>Please use `&quot;`Add New Course`&quot;` button to add your first course.</p>
      <Button onClick={onAddCourseClick}>Add New Course</Button>
    </div>
  );
};

EmptyCourseList.propTypes = {
  onAddCourseClick: PropTypes.func.isRequired,
};

export default EmptyCourseList;
