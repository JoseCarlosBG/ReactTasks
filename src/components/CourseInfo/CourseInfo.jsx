import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CourseInfo.css';

const CourseInfo = ({ authors }) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://localhost:4000/courses/${courseId}`);
        if (response.ok) {
          const data = await response.json();
          setCourse(data.result);
        } else {
          console.error('Failed to fetch course details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

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
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Creation Date:</strong> {course.creationDate}</p>
      <p><strong>Authors:</strong> {courseAuthors.join(', ')}</p>
      <button onClick={handleBack}>Back to courses</button>
    </div>
  );
};

CourseInfo.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CourseInfo;
