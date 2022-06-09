import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http';
import './Search.css';

const Search = React.memo(({ onLoadIngredients }) => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const filterInputRef = useRef();
  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    // 시간 지연
    const timer = setTimeout(() => {
      // timeout 실행 시점과 현재의 값이 같은 경우
      if(enteredFilter === filterInputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
        
        sendRequest(
          `https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients.json${query}`,
          'GET'
        );
      }
    }, 600);

    // clean up 함수
    return () => {
      clearTimeout(timer);
    };
  }, [enteredFilter, filterInputRef, sendRequest]);

  useEffect(() => {
    if(!isLoading && !error && data) {
      const loadedIngredients = [];
      for(const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input
            type="text"
            onChange={(event) => setEnteredFilter(event.target.value)}
            value={enteredFilter}
            ref={filterInputRef}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
