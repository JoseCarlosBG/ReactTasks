import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";
import rootReducer from "../../../store/rootReducer";

// Helper function to render with Redux and Router
const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};

describe("Header component", () => {
  test("should display logo and user name", () => {
    const initialState = {
      user: {
        name: "John Doe",
        token: "sample-token",
      },
    };

    renderWithRedux(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      { initialState },
    );

    // Check for the Logo component
    expect(screen.getByTestId("logo")).toBeInTheDocument();

    // Check for the user name
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  test("should display ADMIN if no user name is provided", () => {
    const initialState = {
      user: {
        name: "",
        token: "sample-token",
      },
    };

    renderWithRedux(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
      { initialState },
    );

    // Check for the default user name ADMIN
    expect(screen.getByText("ADMIN")).toBeInTheDocument();
  });

  test("should not display user name on login or registration page", () => {
    const initialState = {
      user: {
        name: "John Doe",
        token: "sample-token",
      },
    };

    renderWithRedux(
      <BrowserRouter initialEntries={["/login"]}>
        <Header />
      </BrowserRouter>,
      { initialState },
    );

    // Ensure the user name is not displayed on the login page
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});
