import { ENV, API_ENDPOINTS, PATHS } from "./constants";

const getToken = () => {
  return localStorage.getItem("userToken");
};

export const fetchAuthors = async () => {
  try {
    const response = await fetch(`${ENV + API_ENDPOINTS.AUTHORS}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch authors: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching authors:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${ENV + API_ENDPOINTS.LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.successful || !result.result) {
      throw new Error("Login failed: Invalid response data");
    }

    return {
      token: result.result.replace("Bearer ", ""),
      user: result.user,
    };
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const getUserData = async (token) => {
  const response = await fetch(`${ENV + API_ENDPOINTS.MY_USER}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text(); // Read the response body as text
    throw new Error(
      `HTTP error! status: ${response.status}, response: ${errorText}`,
    );
  }

  const data = await response.json();
  return data;
};

export const addCourse = async (courseData, token) => {
  try {
    const response = await fetch(`${ENV + PATHS.ADD_COURSE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      throw new Error(`Failed to add course: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

export const deleteCourse = async (courseId) => {
  const token = getToken();
  try {
    const response = await fetch(
      `${ENV + API_ENDPOINTS.ROOT_COURSES}/${courseId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to delete course: ${response.status}`);
    }

    return;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};
