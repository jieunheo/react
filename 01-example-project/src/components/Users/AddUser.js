import React, { useState, useRef } from 'react';

import Wrapper from '../Helpers/Wrapper';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = props => {
  const nameInputRef = useRef();
  const ageInputRef  = useRef();

  const [error, setError] = useState('');

  const addUserHandler = event => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge  = ageInputRef.current.value;

    // 값이 하나라도 비어있다면
    if(enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).'
      });
      return;
    }

    // 나이가 0 이하라면
    if(+enteredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).'
      });
      return;
    }

    // 사용자 객체 만들기
    // 내가 혼자 한 방식
    // props.onAddUser({
    //   name: enteredUsername,
    //   age: enteredAge
    // });
    props.onAddUser(enteredName, enteredUserAge);

    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  }

  return (
    <Wrapper>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            ref={nameInputRef}
          />
          <label htmlFor='age'>Age (Years)</label>
          <input
            id='age'
            type='number'
            ref={ageInputRef}
          />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
}

export default AddUser;