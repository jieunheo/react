// 1. npm init
// 2. npm install redux

// 3. redux 임포트
const redux = require('redux');

// 5. reducer 함수 추가
// 9. 처음 실행 시 counter 값이 없기 때문에 오류 -> 초기값 설정
const countReducer = (state = { counter: 0 }, action) => {
  // 11. 액션에 따른 상태 변화
  if(action.type === 'increment') {
    return {
      counter: state.counter + 1
    };
  }

  if(action.type === 'decrement') {
    return {
      counter: state.counter - 1
    };
  }
  
  return state;
};

// 4. 저장소 객체 만들기
// 6. 만든 함수를 createStore()에 넣기
const store = redux.createStore(countReducer);

// 초기 상태 확인
// console.log(store.getState());

// 7. redux 구독을 위한 상수
const counterSubscriber = () => {
  // 최신 상태 받아오기
  const latestState = store.getState();
  console.log(latestState);
};

// 8. 함수 실행
store.subscribe(counterSubscriber);

// 10. 액션 발송
store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });