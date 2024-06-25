import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './CreateCourse.css';

const CreateCourse = ({ authors, setAuthors, onCreateCourse, onCancel }) => {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const durationRef = useRef(null);
  const creationDateRef = useRef(null);
  const newAuthorNameRef = useRef(null);

  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateTitle = (title) => {
    const titleRegex = /^[A-Za-z]{4,20}$/;
    return titleRegex.test(title);
  };

  const validateDescription = (description) => {
    return description.length >= 4 && description.length <= 50;
  };

  const validateDuration = (duration) => {
    return !isNaN(+duration);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateTitle(titleRef.current.value)) {
      newErrors.title = 'The title must contain only between 4-20 alphabetical characters.';
    }
    if (!validateDescription(descriptionRef.current.value)) {
      newErrors.description = 'Description must be 4-50 characters';
    }
    if (!validateDuration(durationRef.current.value)) {
      newErrors.duration = 'Duration must be a number.';
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
        authors: selectedAuthors,
      };
      onCreateCourse(newCourse);
      navigate('/courses');
    }
  };

  const handleAddAuthor = () => {
    const newAuthorName = newAuthorNameRef.current.value.trim();
    if (newAuthorName) {
      const newAuthor = {
        id: Date.now().toString(),
        name: newAuthorName,
      };
      setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
      setSelectedAuthors((prevSelectedAuthors) => [...prevSelectedAuthors, newAuthor.id]);
      newAuthorNameRef.current.value = '';
    }
  };

  const handleAuthorSelection = (authorId) => {
    setSelectedAuthors((prevSelectedAuthors) =>
      prevSelectedAuthors.includes(authorId)
        ? prevSelectedAuthors.filter((id) => id !== authorId)
        : [...prevSelectedAuthors, authorId]
    );
  };

  return (
    <div className="create-course">
      <form className="create-course__form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Title" ref={titleRef} required />
          {errors.title && <div className="error">{errors.title}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" placeholder="Description" ref={descriptionRef} required></textarea>
          {errors.description && <div className="error">{errors.description}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input type="number" id="duration" placeholder="Duration (hours)" ref={durationRef} required />
          {errors.duration && <div className="error">{errors.duration}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="creationDate">Creation Date</label>
          <input type="date" id="creationDate" placeholder="Creation Date" ref={creationDateRef} required />
        </div>
        <div className="form-group">
          <label>Authors</label>
          <div className="authors">
            <div className="authors__list">
              {authors.map((author) => (
                <div key={author.id} className="authors__list-item">
                  <span>{author.name}</span>
                  <button type="button" onClick={() => handleAuthorSelection(author.id)}>
                    {selectedAuthors.includes(author.id) ? 'Remove' : 'Add'}
                  </button>
                </div>
              ))}
            </div>
            <div className="authors__new">
              <input type="text" placeholder="New Author Name" ref={newAuthorNameRef} />
              <button type="button" onClick={handleAddAuthor}>
                Create Author
              </button>
            </div>
          </div>
          <div className="selected-authors">
            <h4>Course Authors</h4>
            {selectedAuthors.length > 0 ? (
              <ul>
                {selectedAuthors.map((authorId) => {
                  const author = authors.find((auth) => auth.id === authorId);
                  return <li key={authorId}>{author ? author.name : 'Unknown Author'}</li>;
                })}
              </ul>
            ) : (
              <p>Author list is empty</p>
            )}
          </div>
        </div>
        <div className="form-buttons">
          <button className="button" type="submit">
            Create Course
          </button>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => {
              onCancel();
              navigate('/courses');
            }}
          >
            Cancel
          </button>
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
