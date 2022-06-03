// state를 전역적으로 관리

import { useState, useEffect } from "react";

// 1. 전역으로 사용할 값 선언
let globalState = {};
let listeners = [];
let actions = {/* actionIdentifier: () => {} */};

// 2. 커스텀 훅 생성
export const useStore = () => {
  // 전역 객체 사용
  const setState = useState(globalState)[1]; // 두번째 값만 사용

  // 4. actions을 넘기기 위한 상수(함수여야 함)
  const dispatch = actionIdentifier => {
    // actions 안에 key 값과 state를 넘겨 새로운 state 만들기
    const newState = actions[actionIdentifier](globalState);

    // 기존 state에 새 state 추가
    globalState = {...globalState, ...newState};

    // 업데이트 된 state를 listeners에 알리기
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  // 3. 사용하는 값만 listeners에 추가되도록(컴포넌트가 마운트 될 때 업데이트)
  useEffect(() => {
    // 업데이트 함수 추가
    listeners.push(setState);

    // 더이상 마운트 되지 않을 때
    return () => {
      // setState 값이 수정된 경우 해당 값 삭제
      listeners = listeners.filter(li => li !== setState);
    }
  }, [setState]);

  // 커스텀 훅의 반환
  return [globalState, dispatch];
}

// 5. action을 바꿀 수 있는 함수
export const initStore = (userActions, initialState) => {
  // initialState이 있는 경우
  if (initialState) {
    // 값으로 넣어주기
    globalState = { ...globalState, ...initialState };
  }
  // actions에 userActions 병합
  actions = { ...actions, ...userActions };
};