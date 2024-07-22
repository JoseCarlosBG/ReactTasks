// src/store/courses/actions.js
import { SAVE_COURSES, ADD_COURSE, DELETE_COURSE } from './types';
import { API_ENDPOINTS, ENV } from '../../constants';

// Action creators
export const saveCoursesAction = (payload) => ({ type: SAVE_COURSES, payload });
export const addCourseAction = (payload) => ({ type: ADD_COURSE, payload });
export const deleteCourseAction = (payload) => ({ type: DELETE_COURSE, payload });

// Async action to fetch courses
export const fetchCourses = (token, searchTerm = '', searchBy = 'title') => {
  return async (dispatch) => {
    try {
      let url;
      if (searchTerm===''){
        url=`${ENV + API_ENDPOINTS.COURSES}`
      }
      else{
        url=`${ENV + API_ENDPOINTS.FILTER}${searchBy}=${searchTerm}`;
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch(saveCoursesAction(data.result));
      } else {
        console.error('Failed to fetch courses:', response.status);
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
};


// Async action to fetch a course by ID
export const fetchCourseById = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${ENV + API_ENDPOINTS.COURSES}/${id}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(saveCoursesAction([data.result]));  // Ensure to update the state with the course details
      } else {
        console.error('Failed to fetch course details:', response.status);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };
};

// Async action to delete a course
export const deleteCourse = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${ENV + API_ENDPOINTS.ROOT_COURSES}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(deleteCourseAction(id));
        // Optionally, refetch the courses list to ensure the state is up-to-date
        const coursesResponse = await fetch(`${ENV + API_ENDPOINTS.ROOT_COURSES}`);
        if (coursesResponse.ok) {
          const data = await coursesResponse.json();
          dispatch(saveCoursesAction(data.result));
        }
      } else {
        console.error('Failed to delete course:', response.status);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
};

// Async action to create a new course
export const addCourse = (courseData, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${ENV + API_ENDPOINTS.ROOT_COURSES}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });
      if (response.ok) {
        const newCourse = await response.json();
        dispatch(addCourseAction(newCourse));
      } else {
        console.error('Failed to create course:', response.status);
      }
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };
};