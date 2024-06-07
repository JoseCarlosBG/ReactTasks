import React, { useState } from 'react';
import './CreateCourse.css';
import PropTypes from 'prop-types';

const CreateCourse = ({ authors, setAuthors, onCreateCourse, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [newAuthorName, setNewAuthorName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      id: Date.now().toString(),
      title,
      description,
      duration: parseInt(duration, 10),
      creationDate,
      authors: selectedAuthors,
    };
    onCreateCourse(newCourse);
  };

  const handleAuthorChange = (e) => {
    const { value, checked } = e.target;
    setSelectedAuthors(prevSelectedAuthors =>
      checked ? [...prevSelectedAuthors, value] : prevSelectedAuthors.filter(author => author !== value)
    );
  };

  const handleAddAuthor = () => {
    if (newAuthorName.trim()) {
      const newAuthor = {
        id: Date.now().toString(),
        name: newAuthorName,
      };
      setAuthors(prevAuthors => [...prevAuthors, newAuthor]);
      setSelectedAuthors(prevSelectedAuthors => [...prevSelectedAuthors, newAuthor.id]);
      setNewAuthorName('');
    }
  };

  return (
    <div className="create-course">
      <form className="create-course__form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        <input type="number" placeholder="Duration (hours)" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        <input type="date" placeholder="Creation Date" value={creationDate} onChange={(e) => setCreationDate(e.target.value)} required />
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
              value={newAuthorName}
              onChange={(e) => setNewAuthorName(e.target.value)}
            />
            <button type="button" onClick={handleAddAuthor}>Add Author</button>
          </div>
        </div>
        <div className="create-course__buttons">
          <button className="button" type="submit">Create Course</button>
          <button className="button button--secondary" type="button" onClick={onCancel}>Cancel</button>
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
