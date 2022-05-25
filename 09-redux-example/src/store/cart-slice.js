import { createSlice } from '@reduxjs/toolkit';

const cartInitialState = {
  items: [],        // 카트 아이템
  totalQuantity: 0, // 총 갯수
  totalAmount: 0    // 총 가격
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addItemToCart(state, action) {
      // 넘겨받은 item payload
      const newitem = action.payload;

      // 기존에 있는 값인지 확인
      const existingItem = state.items.find(item => item.id === newitem.id);

      if(!existingItem) { // 없는 값인 경우
        // item 추가
        state.items.push({
          itemId: newitem.id,
          name: newitem.title,
          price: newitem.price,
          quantity: 1, // newitem.quantity,
          totalPrice: newitem.price
        });
      } else { // 있는 값인 경우
        // 갯수 추가
        existingItem.quantity++; // = existingItem.quantity + newitem.quantity;
        
        // 가격 추가
        existingItem.totalPrice = existingItem.totalPrice + newitem.totalPrice;
      }

      // state.totalQuantity = state.totalQuantity + (newitem.price * newitem.quantity);
      // state.totalAmount = state.totalAmount + newitem.quantity;
    }, 
    removeItemFromCart(state) {
      return cartInitialState;
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;