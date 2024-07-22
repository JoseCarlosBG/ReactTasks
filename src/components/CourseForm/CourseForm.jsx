import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CourseForm.css';
import { addCourse } from '../../store/courses/actions'; // Import the addCourse action
import { addAuthor } from '../../store/authors/actions'; // Import the addAuthor action

const CourseForm = ({ authors, onCancel }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const durationRef = useRef(null);
  const creationDateRef = useRef(null);
  const newAuthorNameRef = useRef(null);

  const [availableAuthors, setAvailableAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setAvailableAuthors(authors);
  }, [authors]);

  const validateTitle = (title) => /^[A-Za-z]{4,20}$/.test(title);
  const validateDescription = (description) => description.length >= 4 && description.length <= 50;
  const validateDuration = (duration) => !isNaN(+duration);

  const validateForm = () => {
    const newErrors = {};
    if (!validateTitle(titleRef.current.value)) {
      newErrors.titleRef = 'The title must contain between 4-20 alphabetical characters.';
    }
    if (!validateDescription(descriptionRef.current.value)) {
      newErrors.descriptionRef = 'Description must be between 4-50 characters.';
    }
    if (!validateDuration(durationRef.current.value)) {
      newErrors.durationRef = 'Duration must be a number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newCourse = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        duration: parseInt(durationRef.current.value, 10),
        authors: selectedAuthors.map(author => author.id),
      };
      dispatch(addCourse(newCourse)); // Dispatch the action to add the course
      navigate('/courses');
    }
  };

  const handleAddAuthor = (author) => {
    setAvailableAuthors(availableAuthors.filter(a => a.id !== author.id));
    setSelectedAuthors([...selectedAuthors, author].sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleRemoveAuthor = (author) => {
    setSelectedAuthors(selectedAuthors.filter(a => a.id !== author.id).sort((a, b) => a.name.localeCompare(b.name)));
    setAvailableAuthors([...availableAuthors, author].sort((a, b) => {
      return authors.findIndex(au => au.id === a.id) - authors.findIndex(au => au.id === b.id);
    }));
  };

  const handleNewAuthor = () => {
    const newAuthorName = newAuthorNameRef.current.value.trim();
    if (newAuthorName) {
      dispatch(addAuthor(newAuthorName)); // Dispatch action to add author
      newAuthorNameRef.current.value = '';
    }
  };

  return (
    <div className="create-course">
      <form className="create-course__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" placeholder="Title" ref={titleRef} required />
          {errors.titleRef && <div className="error">{errors.titleRef}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea id="description" placeholder="Description" ref={descriptionRef} required></textarea>
          {errors.descriptionRef && <div className="error">{errors.descriptionRef}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (hours):</label>
          <input type="number" id="duration" placeholder="Duration" ref={durationRef} required />
          {errors.durationRef && <div className="error">{errors.durationRef}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="creationDate">Creation Date:</label>
          <input type="date" id="creationDate" ref={creationDateRef} required />
        </div>

        <div className="authors">
          <div className="authors__list">
            <h4>Authors List</h4>
            {availableAuthors.length > 0 ? (
              availableAuthors.map(author => (
                <div className="authors__list-item" key={author.id}>
                  <span>{author.name}</span>
                  <button type="button" onClick={() => handleAddAuthor(author)}>Add</button>
                </div>
              ))
            ) : (
              <p>No available authors.</p>
            )}
          </div>

          <div className="authors__selected">
            <h4>Selected Authors</h4>
            {selectedAuthors.length > 0 ? (
              selectedAuthors.map(author => (
                <div className="authors__selected-item" key={author.id}>
                  <span>{author.name}</span>
                  <button type="button" onClick={() => handleRemoveAuthor(author)}>Remove</button>
                </div>
              ))
            ) : (
              <p>No authors selected.</p>
            )}
          </div>

          <div className="authors__new">
            <input type="text" placeholder="Add new author" ref={newAuthorNameRef} />
            <button type="button" onClick={handleNewAuthor}>Create Author</button>
          </div>
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

CourseForm.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAuthors: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CourseForm;
