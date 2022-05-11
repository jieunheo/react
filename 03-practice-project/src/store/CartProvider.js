import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0
};

// state: reducer에 의해 관리되는 state의 최신값
// action: 
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // concat: 배열에 새 항목 추가
    //         -> 배열을 직접 수정하는 것이 아니라 새 배열을 반환함
    const updatedItems = state.items.concat(action.item);
    const updateTotalAmount = state.titalAmount + action.item.price * action.item.amount;

    return {
      items: updatedItems,
      totalAmount: updateTotalAmount
    }

  } else if (action.type === 'REMOVE') {

  }

  return defaultCartState;
};

const CartProvider = props => {
  const [cartDtate, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = item => {
    dispatchCartAction({
      type: 'ADD',
      item: item
    });
  };

  const removeItemToCartHandler = id => {
    dispatchCartAction({
      type: 'REMOVE',
      id: id
    });
  };

  const cartContext = {
    // 컨텍스트의 구체적인 값
    items: cartDtate.items,
    titalAmount: cartDtate.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemToCartHandler
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;

