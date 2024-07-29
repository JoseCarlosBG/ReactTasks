// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"; // For extended matchers
import { configure } from "@testing-library/react";

// Optional: Configure testing-library to suppress warnings
configure({ testIdAttribute: "data-testid" });
