import React from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = props => {
  const saveExpenseDataHandler = enteredExpenseData => {
    const expanseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    }
    console.log('NewExpanse.js - expanseData: ', expanseData);
    props.onAddExpenseHaldler(expanseData);
  };

  return (
    <div className='new-expense'>
      <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} />
    </div>
  );
}

export default NewExpense;