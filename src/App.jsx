import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';
import './App.css';
import { API_ENDPOINTS, STORAGE_KEYS, PATHS } from './constants';

const App = () => {
  const env = 'http://localhost:4000';
  const [courses, setCourses] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [USER_NAME, setUserName] = useState(localStorage.getItem(STORAGE_KEYS.USER_NAME) || '');

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
        const response = await fetch(env + API_ENDPOINTS.AUTHORS);
        if (response.ok) {
          const data = await response.json();
          setAuthors(data.result);
        } else {
          console.error('Failed to fetch authors:', response.status);
        }
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };

    fetchAuthors();
  }, [env]);

  const handleAddCourseClick = () => {
    navigate(PATHS.ADD_COURSE);
  };

  const handleCreateCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
    navigate(PATHS.COURSES);
  };

  const handleCancelCourseCreation = () => {
    navigate(PATHS.COURSES);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.USER_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_NAME);
    setUserName('');
    navigate(PATHS.LOGIN);
  };

  return (
    <div>
      <Header userName={USER_NAME} onLogout={handleLogout} />
      <Routes>
        <Route path={PATHS.COURSES} element={<Courses onAddCourseClick={handleAddCourseClick} />} />
        <Route path={PATHS.ADD_COURSE} element={<CreateCourse authors={authors} setAuthors={setAuthors} onCreateCourse={handleCreateCourse} onCancel={handleCancelCourseCreation} />} />
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
