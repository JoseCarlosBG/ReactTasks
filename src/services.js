import { ENV, API_ENDPOINTS } from './constants';

export const fetchAuthors = async () => {
  try {
    const response = await fetch(`${ENV + API_ENDPOINTS.AUTHORS}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch authors: ${response.status}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${ENV + API_ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(`Login failed with status: ${response.status}`);
    }

    const result = await response.json();

    if (!result.successful || !result.result) {
      throw new Error('Login failed: Invalid response data');
    }

    return {
      token: result.result.replace('Bearer ', ''),
      user: result.user,
    };
  } catch (error) {
    console.error('Error during login:', error);
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
    throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
  }

  const data = await response.json();
  return data;
};