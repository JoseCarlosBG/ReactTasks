import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Button from '../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import './EmptyCourseList.css';

const EmptyCourseList = () => {
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.user.role);

  const handleAddCourse = () => {
    navigate('/courses/add');
  };

  return (
    <div className="empty-course-list">
      <h2>Course List is Empty</h2>
      {userRole === 'ADMIN' ? (
        <>
          <p>Please use &quot;Add New Course&quot; button to add your first course</p>
          <Button onClick={handleAddCourse}>Add New Course</Button>
        </>
      ) : (
        <p>You don&apos;t have permissions to create a course. Please log in as ADMIN.</p>
      )}
    </div>
  );
};

EmptyCourseList.propTypes = {
  userRole: PropTypes.string,
};

export default EmptyCourseList;
