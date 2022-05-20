import React, { useRef, useState } from 'react';

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState('');

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    console.log(enteredName); // 상태값
    // current: ref에 할당한 값을 가지고 있음(여기서는 input을 포인터)
    //        .value: 해당 포인터의 값
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue); // ref값

    setEnteredName('');
  }

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='form-control'>
        <label htmlFor='name'>Your Name</label>
        <input value={enteredName} ref={nameInputRef} type='text' id='name' onChange={nameInputChangeHandler} />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
