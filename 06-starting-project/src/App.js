/*
더미 데이터 사이트
https://swapi.dev/
*/

import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  // then() 을 대신하는 문법
  // 프로미스를 사용하는 함수에는 async
  // 프로미스를 반환하는 작업 앞에는 await를 쓴다
  async function fetchMovieHandler () {
    const response = await fetch('https://swapi.dev/api/films/')
    const data = await response.json();
    
    const transformedMovies = data.results.map(movieData => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        releaseDate: movieData.relese_date,
        openingText: movieData.opening_crawl
      }
    });
    setMovies(transformedMovies);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
