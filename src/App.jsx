// components/App/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.css';
import { STORAGE_KEYS, PATHS } from './constants';
import { fetchAuthors as fetchAuthorsService } from './services';

const App = () => {
  const [courses, setCourses] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem(STORAGE_KEYS.USER_NAME) || '');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.USER_TOKEN);
    const isAuthPage = location.pathname === PATHS.LOGIN || location.pathname === PATHS.REGISTRATION;

    if (token && isAuthPage) {
      navigate(PATHS.COURSES);
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const authorsData = await fetchAuthorsService();
        setAuthors(authorsData);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, []);

  const handleAddCourseClick = () => {
    navigate(PATHS.ADD_COURSE);
  };

  const handleCourseForm = (newCourse) => {
    setCourses([...courses, newCourse]);
    navigate(PATHS.COURSES);
  };

  const handleCancelCourseCreation = () => {
    navigate(PATHS.COURSES);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_NAME);
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    setUserName('');
    navigate(PATHS.LOGIN);
  };

  return (
    <div>
      <Header userName={userName} onLogout={handleLogout} />
      <Routes>
        <Route path={PATHS.COURSES} element={<Courses onAddCourseClick={handleAddCourseClick} />} />
        <Route path={PATHS.ADD_COURSE} element={
          <PrivateRoute>
            <CourseForm authors={authors} courseId="" setAuthors={setAuthors} onCourseForm={handleCourseForm} onCancel={handleCancelCourseCreation} />
          </PrivateRoute>
        } />
        <Route path="/courses/:courseId" element={
          <PrivateRoute>
            <CourseForm isUpdate={true} authors={authors}  onCancel={handleCancelCourseCreation}/>
          </PrivateRoute>
        } />
        <Route path={PATHS.REGISTRATION} element={<Registration />} />
        <Route path={PATHS.LOGIN} element={<Login setUserName={setUserName} />} />
        <Route path="/courses/:courseId" element={<CourseInfo authors={authors} />} />
        <Route path="/" element={<Navigate to={PATHS.COURSES} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
