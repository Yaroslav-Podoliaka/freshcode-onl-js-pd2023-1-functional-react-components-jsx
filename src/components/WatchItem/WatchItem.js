import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import './WatchItem.css';

const stylesWatchItem = {
  color: "blue",
};

function toggleBackground(movie) {
  return {
    ...stylesWatchItem,
    backgroundColor: movie.isDone ? "cadetblue" : "darkgoldenrod",
  };
};

function WatchItem({ movie, onToggle, onDelete }) {
  useEffect(() => {
    console.log(`Hello ${movie.director}`);
    return () => {
      console.log(`Bye ${movie.title}`);
    };
  }, [movie.director, movie.title]);

  function onMovieDelete(event) {
    event.stopPropagation();
    onDelete(movie.id);
  };

  return (
    <div
      className="watch-item"
      style={toggleBackground(movie)}
      onClick={() => onToggle(movie.id)}
    >
      <p className="content">
        {movie.title} produced by {movie.director}
      </p>
      <span className="delene-btn" onClick={onMovieDelete}>
        X
      </span>
    </div>
  );
}

WatchItem.propTypes = {
  movie: PropTypes.object
};

WatchItem.defaultProps = {
  movie: {},
};

export default WatchItem;
