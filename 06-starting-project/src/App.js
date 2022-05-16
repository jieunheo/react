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
  const [error, setError] = useState(null);

  // then() 을 대신하는 문법
  // 프로미스를 사용하는 함수에는 async
  // 프로미스를 반환하는 작업 앞에는 await를 쓴다
  async function fetchMovieHandler () {
    try {
      setIsLoading(true);
      setError(null); // 이전에 받았을 수도 있는 오류를 초기화
      const response = await fetch('https://swapi.dev/api/films/')

      // 바디부분을 파싱하기 전에 error 캐치
      if(!response.ok) {
        throw new Error('Something went wrong!');
      };

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
    } catch(error) {
      setError(error.message);
    }
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
        {!isLoading && movies.length == 0 && !error && <p>Found no movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
