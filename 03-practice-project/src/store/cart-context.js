import React from 'react';

// 컨텍스트를 사용할 컴포넌트를 미리 생각해두기

// 컨텍스트의 기본 값(자동완성을 위해 미리 넣어둠)
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {}
});

export default CartContext;