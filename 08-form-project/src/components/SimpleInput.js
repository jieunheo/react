import React, { useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false); // 입력시도

  const enteredNameIsValid = enteredName.trim() !== ''; // 이름 유효 여부
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

  let formIsValid = false; // 폼 유효 여부
  if(enteredNameIsValid) {
    formIsValid = true;
  }

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  }

  const nameInputBlurHandler = event => {
    setEnteredNameTouched(true);
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if(!enteredNameIsValid) {
      return;
    }

    console.log(enteredName); // 상태값

    setEnteredName('');
    setEnteredNameTouched(false); // 폼 제출 후 touched 초기화
  };

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control'

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          value={enteredName}
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
      </div>
      {nameInputIsInvalid && <p className='error-text'>Name must not be empty.</p>}
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
