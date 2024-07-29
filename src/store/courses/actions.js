import {
  SAVE_COURSES,
  ADD_COURSE,
  DELETE_COURSE,
  UPDATE_COURSE,
} from "./types";

// Action creators
export const saveCoursesAction = (payload) => ({ type: SAVE_COURSES, payload });
export const addCourseAction = (payload) => ({ type: ADD_COURSE, payload });
export const deleteCourseAction = (payload) => ({
  type: DELETE_COURSE,
  payload,
});
export const updateCourseAction = (payload) => ({
  type: UPDATE_COURSE,
  payload,
});
