export const getCourses = (state) => state.courses;
export const getAuthors = (state) => state.authors;
export const getUser = (state) => state.user;
export const getUserRole = (state) => state.user.role;

export const getCourseById = (state, courseId) =>
  state.courses.find((course) => course.id === courseId);

export const getCourseAuthors = (state, course) => {
  if (!course) return [];
  return course.authors.map((authorId) => {
    const author = state.authors.find((author) => author.id === authorId);
    return author ? author.name : "Unknown Author";
  });
};
