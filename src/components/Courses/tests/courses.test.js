import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Courses from "../Courses";

// Mock data
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  user: { token: "dummy-token", role: "admin" },
  courses: [
    {
      id: "1",
      title: "Course 1",
      description: "Description 1",
      duration: 1,
      creationDate: "01/01/2023",
      authors: ["1"],
    },
    {
      id: "2",
      title: "Course 2",
      description: "Description 2",
      duration: 2,
      creationDate: "02/01/2023",
      authors: ["2"],
    },
  ],
  authors: [
    { id: "1", name: "Author 1" },
    { id: "2", name: "Author 2" },
  ],
};

const store = mockStore(initialState);

describe("Courses Component", () => {
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <Router>
          <Courses onAddCourseClick={jest.fn()} />
        </Router>
      </Provider>,
    );
  };

  test("should display amount of CourseCard equal length of courses array", () => {
    renderComponent();
    const courseCards = screen.getAllByTestId("course-card");
    expect(courseCards.length).toBe(initialState.courses.length);
  });

  test('should show CourseForm after a click on the "Add new course" button', () => {
    renderComponent();
    const addButton = screen.getByText("Add New Course");
    fireEvent.click(addButton);
    expect(screen.getByText("Create Course")).toBeInTheDocument();
  });
});
