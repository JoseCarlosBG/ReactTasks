// constants.js
export const api_endpoints = {
  courses: 'http://localhost:4000/courses/all',
  filter: 'http://localhost:4000/courses/filter?',
  authors: 'http://localhost:4000/authors/all',
  register: 'http://localhost:4000/register',
  login: 'http://localhost:4000/login',
};

export const placeholderTexts = {
  name: 'Enter name',
  email: 'Enter email',
  password: 'Enter password',
};

export const storageKeys = {
  userName: 'userName',
  userToken: 'userToken',
};

export const paths = {
  login: '/login',
  registration: '/registration',
  courses: '/courses',
  addCourse: '/courses/add',
};
