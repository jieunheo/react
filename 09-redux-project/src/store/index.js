import { configureStore } from '@reduxjs/toolkit'; // createReducer도 유사

import counterReducer from './counter';
import authReducer from './auth';

// 스토어 만들기
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer
  } 
});

// store 내보내기
export default store;