import { createSlice } from '@reduxjs/toolkit';

// 기본 값
const uiInitialState = { cartIsVisible: false };

// Slice 만들기
const uiSlice = createSlice({
  name: 'ui', // 구분 이름
  initialState: uiInitialState, // 기본 값
  reducers: { // acions
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible
    }
  }
});

// actions 내보내기
export const uiActions = uiSlice.actions;

// Slice 내보내기
export default uiSlice;