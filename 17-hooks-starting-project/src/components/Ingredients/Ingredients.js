import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetch('https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients.json')
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
      setIngredients(loadedIngredients);
    }).catch(error => console.log(error));
  }, []);

  const addIngredientHandler = (ingredient) => {
    fetch('https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(!response.ok) {
        throw new Error('Error');
      }
      return response.json();
    }).then(data => {
      setIngredients(prevState => [
        ...prevState,
        { id: data.name, ...ingredient }
      ]);
    }).catch(error => console.log(error));
  };

  const removeItemHandler = (id) => {
    setIngredients(prevState => prevState.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} />

      <section>
        <Search />
        <IngredientList ingredients={ingredients} onRemoveItem={removeItemHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
