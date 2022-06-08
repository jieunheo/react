import React, { useReducer, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (currentLngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentLngredients, action.ingredient];
    case 'DELETE':
      return currentLngredients.filter(item => item.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []); // 두번째인수: 초기값
  // const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setIngredients(filteredIngredients);
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    });
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
      // setIngredients(prevState => [
      //   ...prevState,
      //   { id: data.name, ...ingredient }
      // ]);
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...ingredient }
      })
    }).catch(error => console.log(error));
  };

  const removeItemHandler = (id) => {
    setIsLoading(true);

    fetch(`https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false);

      // setIngredients(prevState => prevState.filter(item => item.id !== id));
      dispatch({
        type: 'DELETE',
        id: id
      })
    }).catch(error => {
      setError(error.message);
      setIsLoading(false);
    });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeItemHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
