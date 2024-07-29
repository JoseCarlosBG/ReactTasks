import rootReducer from "../rootReducer";
import coursesReducer from "../courses/reducer";
import { SAVE_COURSES } from "../courses/types";
import { createStore } from "redux";

describe("Reducers", () => {
  describe("coursesReducer", () => {
    const initialState = [];

    it("should return the initial state", () => {
      expect(coursesReducer(undefined, {})).toEqual(initialState);
    });

    it("should handle SAVE_COURSES and return new state", () => {
      const newCourses = [
        {
          id: "1",
          title: "Course 1",
          description: "Description 1",
          duration: 3,
          creationDate: "01/01/2023",
          authors: ["1", "2"],
        },
        {
          id: "2",
          title: "Course 2",
          description: "Description 2",
          duration: 2,
          creationDate: "02/01/2023",
          authors: ["1", "3"],
        },
      ];

      const action = {
        type: SAVE_COURSES,
        payload: newCourses,
      };

      expect(coursesReducer(initialState, action)).toEqual(newCourses);
    });
  });

  describe("rootReducer", () => {
    const initialCoursesState = [];
    const initialAuthorsState = [];
    const initialUserState = {
      token: null,
      name: null,
      email: null,
      role: null,
    };

    it("should return the initial state", () => {
      const store = createStore(rootReducer);
      expect(store.getState().courses).toEqual(initialCoursesState);
      expect(store.getState().authors).toEqual(initialAuthorsState);
      expect(store.getState().user).toEqual(initialUserState);
    });

    it("should handle SAVE_COURSES and return new state for courses", () => {
      const store = createStore(rootReducer);

      const newCourses = [
        {
          id: "1",
          title: "Course 1",
          description: "Description 1",
          duration: 3,
          creationDate: "01/01/2023",
          authors: ["1", "2"],
        },
        {
          id: "2",
          title: "Course 2",
          description: "Description 2",
          duration: 2,
          creationDate: "02/01/2023",
          authors: ["1", "3"],
        },
      ];

      store.dispatch({
        type: SAVE_COURSES,
        payload: newCourses,
      });

      expect(store.getState().courses).toEqual(newCourses);
    });
  });
});
