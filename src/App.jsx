import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import './App.css';
import { api_endpoints, storageKeys, paths } from './constants';

const App = () => {
  const [courses, setCourses] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [userName, setUserName] = useState(localStorage.getItem(storageKeys.userName) || '');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem(storageKeys.userToken);
    const isAuthPage = location.pathname === paths.login || location.pathname === paths.registration;

    if (token && isAuthPage) {
      navigate(paths.courses);
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    // Fetch courses
    const fetchCourses = async () => {
      try {
        const response = await fetch(api_endpoints.courses);
        if (response.ok) {
          const data = await response.json();
          setCourses(data.result);
        } else {
          console.error('Failed to fetch courses:', response.status);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    // Fetch authors
    const fetchAuthors = async () => {
      try {
        const response = await fetch(api_endpoints.authors);
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

    fetchCourses();
    fetchAuthors();
  }, []);

  const handleAddCourseClick = () => {
    navigate(paths.addCourse);
  };

  const handleCreateCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
    navigate(paths.courses);
  };

  const handleCancelCourseCreation = () => {
    navigate(paths.courses);
  };

  const handleLogout = () => {
    localStorage.removeItem(storageKeys.userToken);
    localStorage.removeItem(storageKeys.userName);
    setUserName('');
    navigate(paths.login);
  };

  return (
    <div>
      <Header userName={userName} onLogout={handleLogout} />
      <Routes>
        <Route path={paths.courses} element={<Courses courses={courses} authors={authors} onAddCourseClick={handleAddCourseClick} />} />
        <Route path={paths.addCourse} element={<CreateCourse authors={authors} setAuthors={setAuthors} onCreateCourse={handleCreateCourse} onCancel={handleCancelCourseCreation}/>} />
        <Route path={paths.registration} element={<Registration />} />
        <Route path={paths.login} element={<Login setUserName={setUserName} />} />
        <Route path="/" element={<Navigate to={paths.courses} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
