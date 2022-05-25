import { createSlice } from '@reduxjs/toolkit';

// 기본 값
const uiInitialState = { cartIsVisible: false, notification: null };

// Slice 만들기
const uiSlice = createSlice({
  name: 'ui', // 구분 이름
  initialState: uiInitialState, // 기본 값
  reducers: { // acions
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,  // 상태
        title: action.payload.title,    // 이름
        message: action.payload.message // 메세지
      }
    }
  }
});

// actions 내보내기
export const uiActions = uiSlice.actions;

// Slice 내보내기
export default uiSlice;