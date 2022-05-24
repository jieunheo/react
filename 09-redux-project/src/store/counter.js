import { createSlice } from '@reduxjs/toolkit';

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

// actions 내보내기
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;