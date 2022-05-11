import CartContext from './cart-context';

const CartProvider = props => {
  const addItemToCartHandler = item => {

  };

  const removeItemToCartHandler = id => {

  };

  const cartContext = {
    // 컨텍스트의 구체적인 값
    items: [],
    titalAmount: 0,
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

