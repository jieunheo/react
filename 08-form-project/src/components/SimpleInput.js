import React, { useRef, useState, useEffect } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false); // 유효여부
  const [enteredNameTouched, setEnteredNameTouched] = useState(false); // 입력시도

  useEffect(() => {
    if(enteredNameIsValid) {
      console.log('Name Input is valid!');
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
    setEnteredNameIsValid(true);
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if(enteredName.trim() === '') {
      setEnteredNameIsValid(false);

      return;
    }

    setEnteredNameIsValid(true);

    console.log(enteredName); // 상태값
    // current: ref에 할당한 값을 가지고 있음(여기서는 input을 포인터)
    //        .value: 해당 포인터의 값
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue); // ref값

    setEnteredName('');
  };

  // 인풋 값 없음 && 인풋 건드림
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input value={enteredName} ref={nameInputRef} type='text' id='name' onChange={nameInputChangeHandler} />
      </div>
      {nameInputIsInvalid && <p className='error-text'>Name must not be empty.</p>}
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
