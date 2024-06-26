import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CreateCourse.css';

const CreateCourse = ({ authors, setAuthors, onCreateCourse, onCancel }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const durationRef = useRef(null);
  const creationDateRef = useRef(null);
  const newAuthorNameRef = useRef(null);

  const [availableAuthors, setAvailableAuthors] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setAvailableAuthors(authors);
  }, [authors]);

  const validateTitle = (title) => {
    const titleRegex = /^[A-Za-z]{4,20}$/;
    return titleRegex.test(title);
  };

  const validateDescription = (description) => {
    return description.length >= 4 && description.length <= 50;
  };

  const validateDuration = (duration) => {
    return !isNaN(+duration); // Convert the input value to a number and check if it is really a number
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateTitle(titleRef.current.value)) {
      newErrors.titleRef = 'The title must contain only between 4-20 alphabetical characters.';
    }
    if (!validateDescription(descriptionRef.current.value)) {
      newErrors.descriptionRef = 'Description must be 4-50 characters';
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
        id: Date.now().toString(),
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        duration: parseInt(durationRef.current.value, 10),
        creationDate: creationDateRef.current.value,
        authors: selectedAuthors.map(author => author.id),
      };
      onCreateCourse(newCourse);
      navigate('/courses');
    }
  };

  const handleAddAuthor = (author) => {
    setAvailableAuthors(availableAuthors.filter(a => a.id !== author.id));
    setSelectedAuthors(
      [...selectedAuthors, author].sort((a, b) => a.name.localeCompare(b.name))
    );
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
      const newAuthor = {
        id: Date.now().toString(),
        name: newAuthorName,
      };
      setAuthors([...authors, newAuthor]);
      setAvailableAuthors([...availableAuthors, newAuthor].sort((a, b) => {
        return authors.findIndex(au => au.id === a.id) - authors.findIndex(au => au.id === b.id);
      }));
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

          <div className="selected-authors">
            <h4>Course Authors</h4>
            {selectedAuthors.length > 0 ? (
              selectedAuthors.map(author => (
                <div className="authors__list-item" key={author.id}>
                  <span>{author.name}</span>
                  <button type="button" onClick={() => handleRemoveAuthor(author)}>Remove</button>
                </div>
              ))
            ) : (
              <p>Author list is empty.</p>
            )}
          </div>
        </div>

        <div className="authors__new">
          <input
            type="text"
            placeholder="New Author Name"
            ref={newAuthorNameRef}
          />
          <button type="button" onClick={handleNewAuthor}>Create Author</button>
        </div>

        <div className="create-course__buttons">
          <button className="button" type="submit">Create Course</button>
          <button className="button button--secondary" type="button" onClick={() => {
            onCancel();
            navigate('/courses');
          }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

CreateCourse.propTypes = {
  authors: PropTypes.array.isRequired,
  setAuthors: PropTypes.func.isRequired,
  onCreateCourse: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CreateCourse;
