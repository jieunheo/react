import React, { useReducer, useCallback, useMemo } from 'react';
// useCallback => 함수 저장
// useMemo     => 값 저장

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

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...curHttpState, loading: false }
      case 'ERROR':
        return { loading: false, error: action.errorMessage }
      case 'CLEAR':
        return { ...curHttpState, error: null }
    default:
      throw new Error('Should not be reached!');
  }
}

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []); // 두번째인수: 초기값
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});
  // const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();
  
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
    dispatchHttp({ type: 'SEND' });

    fetch('https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      // setIsLoading(false);
      dispatchHttp({ type: 'RESPONSE' });

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
  }, []);

  const removeItemHandler = useCallback((id) => {
    // setIsLoading(true);
    dispatchHttp({ type: 'SEND' });

    fetch(`https://react-hook-update-7f183-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then(response => {
      // setIsLoading(false);
      dispatchHttp({ type: 'RESPONSE' });

      // setIngredients(prevState => prevState.filter(item => item.id !== id));
      dispatch({
        type: 'DELETE',
        id: id
      })
    }).catch(error => {
      // setError(error.message);
      // setIsLoading(false);
      dispatchHttp({ type: 'ERROR', errorMessage: error.message });
    });
  }, []);

  const clearError = () => {
    // setError(null);
    dispatchHttp({ type: 'CLEAR' });
  };

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
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}

      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
