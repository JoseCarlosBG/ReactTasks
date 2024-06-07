import React, { useState } from 'react';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import './App.css';
import { mockedCoursesList, mockedAuthorsList } from './constants';

const App = () => {
  const [courses, setCourses] = useState(mockedCoursesList);
  const [authors, setAuthors] = useState(mockedAuthorsList);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);

  const handleAddCourseClick = () => {
    setIsCreatingCourse(true);
  };

  const handleCreateCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
    setIsCreatingCourse(false);
  };

  const handleCancelCourseCreation = () => {
    setIsCreatingCourse(false);
  };

  return (
    <div className="app">
      <Header name="Jose" onButtonClick={() => {}} />
      {isCreatingCourse ? (
        <CreateCourse
          authors={authors}
          setAuthors={setAuthors}
          onCreateCourse={handleCreateCourse}
          onCancel={handleCancelCourseCreation}
        />
      ) : (
        <Courses
          courses={courses}
          authors={authors}
          onAddCourseClick={handleAddCourseClick}
        />
      )}
    </div>
  );
};

export default App;
