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

      // 총 수량 증가
      state.totalQuantity++;
      state.totalAmount = state.totalAmount + newitem.totalPrice;

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
        existingItem.totalPrice = existingItem.totalPrice + newitem.price;
      }
    }, 
    removeItemFromCart(state, action) {
      const id = action.payload;

      // 총 수량 감소
      state.totalQuantity--;
      state.totalAmount = state.totalAmount - id.totalPrice;
      
      const existingItem = state.items.find(item => item.id === id);
      if(existingItem.quantity === 1) { // 1개 남은 경우
        // item 삭제
        state.items = state.items.filter(item => item.id === id);
      } else { // 아닌 경우
        // quantity 값 1씩 줄이기
        existingItem.quantity--;
      }
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;