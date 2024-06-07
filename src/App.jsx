import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import './App.css';
import { mockedCoursesList, mockedAuthorsList } from './constants';

const App = () => {
  const [courses, setCourses] = useState(mockedCoursesList);
  const [authors, setAuthors] = useState(mockedAuthorsList);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const isAuthPage = location.pathname === '/login' || location.pathname === '/registration';

    if (token && isAuthPage) {
      navigate('/courses');
    }
  }, [navigate, location.pathname]);

  const handleAddCourseClick = () => {
    navigate('/courses/add');
  };

  const handleCreateCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
    navigate('/courses');
  };

  const handleCancelCourseCreation = () => {
    navigate('/courses');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    setUserName('');
    navigate('/login');
  };

  return (
    <div>
      <Header userName={userName} onLogout={handleLogout} />
      <Routes>
        <Route path="/courses" element={<Courses courses={courses} authors={authors} onAddCourseClick={handleAddCourseClick} />} />
        <Route path="/courses/add" element={<CreateCourse authors={authors} setAuthors={setAuthors} onCreateCourse={handleCreateCourse} onCancel={handleCancelCourseCreation}/>} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login setUserName={setUserName} />} />
        <Route path="/" element={<Navigate to="/courses" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
