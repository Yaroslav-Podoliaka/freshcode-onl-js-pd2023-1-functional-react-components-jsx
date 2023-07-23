import React, { useState } from 'react';
import GrowingButton from '../GrowingButton/GrowingButton';
import PropTypes from 'prop-types';
import './WatchForm.css';

function WatchForm({onSubmit}) {
  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');

  function onInputChange(event) {
    event.target.name === 'title' && setTitle(event.target.value);
    event.target.name === 'director' && setDirector(event.target.value);
  };

  function onFormSubmit(event) {
    event.preventDefault();
    onSubmit({
      title,
      director,
      isDone: false,
    })
  }

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={onInputChange}
      ></input>
      <input
        type="text"
        name="director"
        value={director}
        onChange={onInputChange}
      ></input>
      <button className="add"> Add</button>
      <GrowingButton />
    </form>
  );
}

WatchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
  
export default WatchForm