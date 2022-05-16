/*
더미 데이터 사이트
https://swapi.dev/
*/

import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // then() 을 대신하는 문법
  // 프로미스를 사용하는 함수에는 async
  // 프로미스를 반환하는 작업 앞에는 await를 쓴다
  async function fetchMovieHandler () {
    setIsLoading(true);
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
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {isLoading ? <p>Loading...</p> : <MoviesList movies={movies} />} */}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length == 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
