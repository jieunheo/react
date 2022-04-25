import React, { useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import classes from './AddUser.module.css';

const AddUser = props => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');

  const addUserHandler = event => {
    event.preventDefault();

    // 값이 하나라도 비어있다면
    if(enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      return;
    }

    // 나이가 0 이하라면
    if(+enteredAge <= 0) {
      return;
    }

    // 사용자 객체 만들기
    // 내가 혼자 한 방식
    // props.onAddUser({
    //   name: enteredUsername,
    //   age: enteredAge
    // });
    props.onAddUser(enteredUsername, enteredAge);

    setEnteredUsername('');
    setEnteredAge('');
  };

  const usernameChangeHandler = event => {
    setEnteredUsername(event.target.value);
  }

  const ageChangeHandler = event => {
    setEnteredAge(event.target.value);
  }

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor='username'>Username</label>
        <input id='username' type='text' value={enteredUsername} onChange={usernameChangeHandler} />
        <label htmlFor='age'>Age (Years)</label>
        <input id='age' type='number' value={enteredAge} onChange={ageChangeHandler} />
        <Button type='submit'>Add User</Button>
      </form>
    </Card>
  );
}

export default AddUser;