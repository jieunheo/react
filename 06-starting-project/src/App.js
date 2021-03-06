/* 더미 데이터 사이트: https://swapi.dev/
 * firebase(풀 백엔드): https://firebase.google.com/ */

import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // then() 을 대신하는 문법
  // 프로미스를 사용하는 함수에는 async
  // 프로미스를 반환하는 작업 앞에는 await를 쓴다
  const fetchMovieHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null); // 이전에 받았을 수도 있는 오류를 초기화
      const response = await fetch('https://react-study-2cfc9-default-rtdb.firebaseio.com/movies.json');

      // 바디부분을 파싱하기 전에 error 캐치
      if(!response.ok) {
        throw new Error('Something went wrong!');
      };

      const data = await response.json();
      console.log(data);

      const loadedMovies = [];
      for(const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText
        });
      }

      // const transformedMovies = data.map(movieData => {
      //   return {
      //     id: movieData.episode_id,
      //     title: movieData.title,
      //     releaseDate: movieData.relese_date,
      //     openingText: movieData.opening_crawl
      //   }
      // });

      setMovies(loadedMovies);
    } catch(error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  // 함수의 호이스팅
  // fetchMovieHandler 함수가 만들어진 후 useEffect로 실행해야 함
  // 즉, 순서가 중요
  useEffect(() => {
    fetchMovieHandler();
  }, [fetchMovieHandler]);

  // 프로미스 객체를 받기 때문에 async, await 사용
  async function addMovieHandler(movie) {
    try {
      // move 객체를 받아 데이터베이스에 저장
      const response = await fetch('https://react-study-2cfc9-default-rtdb.firebaseio.com/movies.json', {
        method: 'POST',
        body: JSON.stringify(movie), // 자바스크립트 객체 -> JSON 형식
        headers: {
          'Content-Type': 'application/json' // 전달될 컴텐트 타입 설정
        }
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  }
  
  let content = <p>Found no movies.</p>;
  if(movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if(error) {
    content = <p>{error}</p>;
  }

  // loading인 경우 모든 값을 뒤집어 씌우기 때문에 마지막에 평가
  if(isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
    <section>
      <AddMovie onAddMovie={addMovieHandler} />
    </section>
    <section>
      <button onClick={fetchMovieHandler}>Fetch Movies</button>
    </section>
    <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
