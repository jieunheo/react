import React, { useState, useEffect } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(({ onLoadIngredients }) => {
  const [enteredFilter, setEnteredFilter] = useState('');

  useEffect(() => {
    const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch('https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients.json' + query)
    .then(response => {
      if(!response.ok) {
        throw new Error('Error');
      }
      return response.json();
    }).then(data => {
      const loadedIngredients = [];
      for(const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        });
      }
      onLoadIngredients(loadedIngredients);
    }).catch(error => console.log(error));
  }, [enteredFilter, onLoadIngredients]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" onChange={(event) => setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
