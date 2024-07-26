import { API_ENDPOINTS, ENV } from '../../constants';
import { addCourse as addCourseService, deleteCourse as deleteCourseService } from '../../services';
import { saveCoursesAction, addCourseAction, deleteCourseAction, updateCourseAction } from './actions';

const getToken = () => localStorage.getItem('userToken');

// Async action to fetch courses
export const fetchCourses = (token, searchTerm = '', searchBy = 'title') => {
  return async (dispatch) => {
    try {
      let url = searchTerm === '' 
        ? `${ENV + API_ENDPOINTS.COURSES}` 
        : `${ENV + API_ENDPOINTS.FILTER}${searchBy}=${searchTerm}`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
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
      const response = await fetch(`${ENV + API_ENDPOINTS.ROOT_COURSES}/${id}`);
      if (response.ok) {
        const data = await response.json();
        dispatch(saveCoursesAction([data.result])); // Ensure to update the state with the course details
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
      await deleteCourseService(id);
      dispatch(deleteCourseAction(id));
      
      const token = getToken();
      const coursesResponse = await fetch(`${ENV + API_ENDPOINTS.COURSES}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (coursesResponse.ok) {
        const data = await coursesResponse.json();
        dispatch(saveCoursesAction(data.result));
      } else {
        console.error('Failed to fetch updated courses:', coursesResponse.status);
      }
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };
};

// Async action to create a new course
export const addCourse = (courseData) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const newCourse = await addCourseService(courseData, token);
      dispatch(addCourseAction(newCourse));
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };
};

// Async action to update a course
export const updateCourse = (id, courseData) => {
  return async (dispatch) => {
    try {
      const token = getToken();
      const response = await fetch(`${ENV + API_ENDPOINTS.ROOT_COURSES}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error(`Failed to update course: ${response.status}`);
      }

      const updatedCourse = await response.json();
      dispatch(updateCourseAction(updatedCourse));
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };
};
