import React, { useEffect, useState } from 'react';
import { nanoid } from "nanoid";
import api from './movie-service'
import WatchList from './components/WatchList/WatchList';
import WatchForm from './components/WatchForm/WatchForm';
import initialState from "./model/initialState";
import "./App.css";

function App() {
  const [toWatchMovies, setToWatchMovies] = useState(initialState);

  // function saveToStorage(movies) {
  //   localStorage.setItem("movies", JSON.stringify(movies));
  // };

  useEffect(() => {
    api.get("/").then(({ data }) => {
      data ? setToWatchMovies(data) : setToWatchMovies([]);
    });
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:5000/watch')
  //     .then((response) => response.json())
  //     .then(data => {
  //       console.log(data);
  //       data ? setToWatchMovies(data) : setToWatchMovies([]);
  //     });
  // }, []);

  // function restoreMovies() {
  //   const data = localStorage.getItem("movies");
  //   return data ? JSON.parse(data) : initialState;
  // };

  // useEffect(() => {
  //   setToWatchMovies(restoreMovies);
  // }, []);

  // function toggleToWatch(id) {
  //   const newWatchMovies = toWatchMovies.map((movie) => {
  //     return movie.id !== id ? movie : { ...movie, isDone: !movie.isDone };
  //   });
  //   setToWatchMovies(newWatchMovies);
  //   saveToStorage(newWatchMovies);
  // }

  function toggleToWatch(id) {
    const updateMovie = toWatchMovies.find((movie) => movie.id === id);
    updateMovie.isDone = !updateMovie.isDone;
    api.put(`/${id}`, updateMovie)
      .then(({ data }) => {
        setToWatchMovies(toWatchMovies.map((movie) =>
          movie.id !== id ? movie : data));
    })
    setToWatchMovies(newWatchMovies);
  }

  function addNewMovie(movie) {
    movie.id = nanoid(12);
    api.post("/", movie).then(({ data }) => {
      const newWatchMovies = [...toWatchMovies, data];
      setToWatchMovies(newWatchMovies);
    });
  }

  // function addNewMovie(movie) {
  //   movie.id = nanoid(12);
  //   const newWatchMovies = [...toWatchMovies, movie];
  //   setToWatchMovies(newWatchMovies);
  //   saveToStorage(newWatchMovies);
  // };

  // function deleteMovie(id) {
  //   const newWatchMovies = toWatchMovies.filter((movie) => movie.id !== id);
  //   setToWatchMovies(newWatchMovies);
  //   saveToStorage(newWatchMovies);
  // }

  function deleteMovie(id) {
    api.delete(`/${id}`)
      .then(({ status }) => console.log(status))
      .catch((event) => console.log(event));
    const newWatchMovies = toWatchMovies.filter((movie) => movie.id !== id);
    setToWatchMovies(newWatchMovies);
  }

  return (
    <div className="container">
      <WatchList
        movies={toWatchMovies}
        onToggle={toggleToWatch}
        onDelete={deleteMovie}
      />
      <WatchForm onSubmit={addNewMovie} />
    </div>
  );
}

export default App;

