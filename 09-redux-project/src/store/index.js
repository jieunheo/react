// redux 로직

// redux 임포트
// const redux = require('redux');
import { createStore } from 'redux';

// 함수 만들기
const counterReducer = (state = { counter: 0 }, action) => {
  if(action.type === 'increment') {
    return {
      counter: state.counter + 1
    }
  }

  if(action.type === 'increase') {
    return {
      counter: state.counter + action.amount
    }
  }

  if(action.type === 'decrement') {
    return {
      counter: state.counter - 1
    }
  }

  return state;
}

// 스토어 만들기
const store = createStore(counterReducer);

export default store;