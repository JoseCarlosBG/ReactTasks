import React from "react";
import { render, screen } from "@testing-library/react";
import CourseCard from "../CourseCard/CourseCard";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

// Mock data
const mockStore = configureStore([]);
const initialState = {
  user: { role: "admin" },
};
const store = mockStore(initialState);

const course = {
  id: "1",
  title: "Course 1",
  description: "This is a test course description.",
  duration: 3,
  creationDate: "01/01/2023",
  authors: ["1", "2"],
};

const authors = [
  { id: "1", name: "Author 1" },
  { id: "2", name: "Author 2" },
];

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <Router>
        <CourseCard course={course} authors={authors} />
      </Router>
    </Provider>,
  );
};

describe("CourseCard Component", () => {
  test("should display title", () => {
    renderComponent();
    expect(screen.getByText(course.title)).toBeInTheDocument();
  });

  test("should display description", () => {
    renderComponent();
    expect(screen.getByText(course.description)).toBeInTheDocument();
  });

  test("should display duration in the correct format", () => {
    renderComponent();
    expect(screen.getByText(`${course.duration} hours`)).toBeInTheDocument();
  });

  test("should display authors list", () => {
    renderComponent();
    const authorNames = authors.map((author) => author.name).join(", ");
    expect(screen.getByText(authorNames)).toBeInTheDocument();
  });

  test("should display created date in the correct format", () => {
    renderComponent();
    expect(screen.getByText(course.creationDate)).toBeInTheDocument();
  });
});
