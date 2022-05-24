// redux 로직

// redux 임포트
// const redux = require('redux');
// import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit'; // createReducer도 유사

// 초기 값
const initialCounterState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: 'counter', // 상태 식별자
  initialState: initialCounterState, // 초기값
  reducers: {
    // redux toolkit의 기능으로, state 값을 직접 수정하는 것 같은 코드를 작성할 수 있음
    //                          -> 실제 state를 직접 바꾸는 것이 아님
    increment(state) {
      state.counter++;
    },
    decrement(state) { 
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    }
  }
});

const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
  name: 'login',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true
    },
    logout(state) {
      state.isAuthenticated = false
    }
  }
});

// 함수 만들기
// const counterReducer = (state = initialState, action) => {
//   if(action.type === 'increment') {
//     return {
//       counter: state.counter + 1,
//       showCounter: state.showCounter
//     }
//   }

//   if(action.type === 'increase') {
//     return {
//       counter: state.counter + action.amount,
//       showCounter: state.showCounter
//     }
//   }

//   if(action.type === 'decrement') {
//     return {
//       counter: state.counter - 1,
//       showCounter: state.showCounter
//     }
//   }

//   if(action.type === 'toggle') {
//     return {
//       counter: state.counter,
//       showCounter: !state.showCounter
//     }
//   }

//   return state;
// }

// 스토어 만들기
// const store = createStore(counterReducer);
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer
  } 
});

// actions 내보내기
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;

// store 내보내기
export default store;