import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = props => {
  const [enteredTitle, setEnteredTitle]   = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate]     = useState('');
  //방안
  // const [userInput, setUserinput] = useState({
  //   enteredTitle: '',
  //   enteredAmount: '',
  //   enteredDate: ''
  // });

  const titleChangeHandler = event => {
    setEnteredTitle(event.target.value);
    //방안1
    // setUserinput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // });
    //방안2
    // setUserinput(precState => {
    //   return {
    //     ...precState,
    //     enteredTitle: event.target.value
    //   }
    // });
    console.log(event.target.value);
  };
  const amountChangeHandler = event => {
    setEnteredAmount(event.target.value);
    //방안1
    // setUserinput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // });
    //방안2
    // setUserinput(precState => {
    //   return {
    //     ...precState,
    //     enteredAmount: event.target.value
    //   }
    // });
    console.log(event.target.value);
  };
  const dateChangeHandler = event => {
    setEnteredDate(event.target.value);
    //방안1
    // setUserinput({
    //   ...userInput,
    //   enteredDate: event.target.value,
    // });
    //방안2
    // setUserinput(precState => {
    //   return {
    //     ...precState,
    //     enteredDate: event.target.value
    //   }
    // });
    console.log(event.target.value);
  };

  const submitHandler = event => {
    event.preventDefault();

    const enteredData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate)
    };
    console.log(enteredData);

    props.onSaveExpenseData(enteredData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input type='text' value={enteredTitle} onChange={titleChangeHandler} />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input type='number'value={enteredAmount}  min='0.01' step='0.01' onChange={amountChangeHandler} />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input type='date'value={enteredDate}  min='2019-01-01' max='2022-12-31' onChange={dateChangeHandler} />
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type='button' onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Add Expense</button>
      </div>
    </form>
  );
}

export default ExpenseForm;