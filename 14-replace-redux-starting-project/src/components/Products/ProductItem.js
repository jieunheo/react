import React from 'react';

import Card from '../UI/Card';
import { useStore } from '../../hook-store/store';
import './ProductItem.css';

// React.memo(): 변화되지 않ㅇ느 컴포넌트가 다시 렌더링 되지 않도록 하기 위해 사용
const ProductItem = React.memo(props => {
  console.log('RENDERING');

  const dispatch = useStore(false)[1]; // [state, dispatch]

  const toggleFavHandler = () => {
    // toggleFav(props.id);
    dispatch('TOGGLE_FAV', props.id);
  };

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <div className="product-item">
        <h2 className={props.isFav ? 'is-fav' : ''}>{props.title}</h2>
        <p>{props.description}</p>
        <button
          className={!props.isFav ? 'button-outline' : ''}
          onClick={toggleFavHandler}
        >
          {props.isFav ? 'Un-Favorite' : 'Favorite'}
        </button>
      </div>
    </Card>
  );
});

export default ProductItem;
