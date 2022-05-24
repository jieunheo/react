// redux 로직

// redux 임포트
// const redux = require('redux');
import { createStore } from 'redux';

// 초기 값
const initialState = { counter: 0, showCounter: true };

// 함수 만들기
const counterReducer = (state = initialState, action) => {
  if(action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter
    }
  }

  if(action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter
    }
  }

  if(action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    }
  }

  if(action.type === 'toggle') {
    return {
      counter: state.counter,
      showCounter: !state.showCounter
    }
  }

  return state;
}

// 스토어 만들기
const store = createStore(counterReducer);

export default store;