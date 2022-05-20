import { useState } from 'react';

// validateValue: 유효성 검사 함수
const useInput = (validateValue) => {
  // 관리할 값
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false); // 입력시도

  // 유효성에 대한 값
  const valuesIsValid = validateValue(enteredValue); // 값 유효 여부
  const hasError = !valuesIsValid && isTouched;

  const valueChangeHandler = event => {
    setEnteredValue(event.target.value);
  }

  const inputBlurHandler = event => {
    setIsTouched(true);
  }

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  }

  return {
    value: enteredValue,
    isValid: valuesIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;