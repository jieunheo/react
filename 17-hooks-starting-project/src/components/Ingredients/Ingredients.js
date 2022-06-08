import React, { useState, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    setIngredients(filteredIngredients);
  }, []);
  
  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);

    fetch('https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setIsLoading(false);

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
    setIsLoading(true);

    fetch(`https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false);
      
      setIngredients(prevState => prevState.filter(item => item.id !== id));
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeItemHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
