import { useReducer } from 'react';

// 4. 상수 만들기
const initialInputState = {
  value: '', // enteredValue
  isTouched: false, //isTouched
}

// 1. 리듀서 함수 만들기
// state: 이전 상태의 state
// action: 최종적으로 새로운 상태 반환
const inputStateReducer = (state, action) => {
  // 9. type에 따른 상태
  if(action.type === 'INPUT') {
    // valueChangeHandler에서 event.target.value 값을 받았기 때문에
    // action에서 값을 받아올 수 있다.
    return { value: action.value, isTouched: state.isTouched }
  };

  if(action.type === 'BLUR') {
    return { value: state.value, isTouched: true }
  };

  if(action.type === 'RESET') {
    return { value: '', isTouched: false }
  };

  // 2. 초기값 설정 - 상수로 관리
  return initialInputState;
};

// validateValue: 유효성 검사 함수
const useInput = (validateValue) => {
  // 3. useReducer 호출 - 초기값 제공
  // 5. 반환값 받기 - [(reducer 함수에 의해 결정되는)상태, (reducer에서 실행할)디스패치함수]
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);

  // 유효성에 대한 값
  // 6. reducer 적용
  const valuesIsValid = validateValue(inputState.value); // 값 유효 여부
  const hasError = !valuesIsValid && inputState.isTouched;

  // 7. reducer에게 실행할 작업을 디스패치
  // type: 디스패치 구분 이름으로, 일반적으로 많이 사용
  const valueChangeHandler = event => {
    dispatch({type: 'INPUT', value: event.target.value});
  }

  const inputBlurHandler = event => {
    dispatch({type: 'BLUR'});
  }

  const reset = () => {
    dispatch({type: 'RESET'});
  }

  // 8. 반환 값 수정
  return {
    value: inputState.value,
    isValid: valuesIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;