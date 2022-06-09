import React, { useReducer, useCallback, useMemo, useEffect } from 'react';
// useCallback => 함수 저장
// useMemo     => 값 저장

import useHttp from '../../hooks/http';
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
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifer
  } = useHttp();
  // const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  useEffect(() => {
    if(!isLoading && !error && reqIdentifer === 'REMOVE_INGREDIENT') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if(!isLoading && !error && reqIdentifer === 'ADD_INGREDIENT') {
      dispatch({
        type: 'ADD',
        ingredient: { id: data.name, ...reqExtra }
      });
    };
  }, [data, reqExtra, reqIdentifer, isLoading, error]);
  
  const filteredIngredientsHandler = useCallback((filteredIngredients) => {
    // setIngredients(filteredIngredients);
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    });
  }, []);
  
  // 재 렌더링이 일어나지 않게 하기 위하여 useCallback()
  const addIngredientHandler = useCallback((ingredient) => {
    // setIsLoading(true);
    sendRequest(
      'https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients.json',
      'POST',
      JSON.stringify(ingredient),
      ingredient,
      'ADD_INGREDIENT'
    );

    // dispatchHttp({ type: 'SEND' });
    // fetch('https://react-hooks-update.firebaseio.com/ingredients.json', {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers: { 'Content-Type': 'application/json' }
    // })
    //   .then(response => {
    //     dispatchHttp({ type: 'RESPONSE' });
    //     return response.json();
    //   })
    //   .then(responseData => {
    //     // setUserIngredients(prevIngredients => [
    //     //   ...prevIngredients,
    //     //   { id: responseData.name, ...ingredient }
    //     // ]);
    //     dispatch({
    //       type: 'ADD',
    //       ingredient: { id: responseData.name, ...ingredient }
    //     });
    //   });
  }, []);

  const removeItemHandler = useCallback((id) => {
    sendRequest(
      `https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients/${id}.json`,
      'DELETE',
      null,
      id,
      'REMOVE_INGREDIENT'
    );
  }, [sendRequest]);

  const clearError = useCallback(() => {
    // dispatchHttp({ type: 'CLEAR' });
  }, []);

  // ingredients가 수정되었을 때만 렌더링
  const ingredientList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeItemHandler}
      />
    );
  }, [ingredients, removeItemHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
