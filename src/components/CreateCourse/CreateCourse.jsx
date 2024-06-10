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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  const handleAuthorChange = (e) => {
    const { value, checked } = e.target;
    setSelectedAuthors(prevSelectedAuthors =>
      checked ? [...prevSelectedAuthors, value] : prevSelectedAuthors.filter(author => author !== value)
    );
  };

  const handleAddAuthor = () => {
    const newAuthorName = newAuthorNameRef.current.value.trim();
    if (newAuthorName) {
      const newAuthor = {
        id: Date.now().toString(),
        name: newAuthorName,
      };
      setAuthors(prevAuthors => [...prevAuthors, newAuthor]);
      setSelectedAuthors(prevSelectedAuthors => [...prevSelectedAuthors, newAuthor.id]);
      newAuthorNameRef.current.value = '';
    }
  };

  return (
    <div className="create-course">
      <form className="create-course__form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" ref={titleRef} required />
        <textarea placeholder="Description" ref={descriptionRef} required></textarea>
        <input type="number" placeholder="Duration (hours)" ref={durationRef} required />
        <input type="date" placeholder="Creation Date" ref={creationDateRef} required />
        <div>
          <label>Authors:</label>
          {authors.map(author => (
            <div key={author.id}>
              <input
                type="checkbox"
                value={author.id}
                checked={selectedAuthors.includes(author.id)}
                onChange={handleAuthorChange}
              />
              {author.name}
            </div>
          ))}
          <div className="create-course__add-author">
            <input
              type="text"
              placeholder="New Author Name"
              ref={newAuthorNameRef}
            />
            <button type="button" onClick={handleAddAuthor}>Add Author</button>
          </div>
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
