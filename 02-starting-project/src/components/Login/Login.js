import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import Input from '../UI/Input/Input';
import AuthContext from '../../store/auth-context';
import classes from "./Login.module.css";

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    };
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    };
  }

  return {
    value: "",
    isValid: false
  };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6
    }
  }

  return {
    value: '',
    isValid: false
  }
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispathEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null
  });

  const [passwordState, dispathPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null
  });

  // auth context
  const ctx = useContext(AuthContext);

  // useRef
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log("effect running");

    return () => {
      console.log("effect clean up!");
    };
  });

  // 객체 디스트럭처링(별칭 할당) - 각 state에서 isValid 값만 추출
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // 의존성과 값은 매치 되어야 함
  // - 유효성 검사 결과가 수정이 된 경우 실행
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 300);

    return () => {
      console.log('clean up!');
      clearTimeout(identifier);
    };
  }, [/*setFormIsValid, */emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispathEmail({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispathPassword({type: 'USER_INPUT', val: event.target.value});

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispathEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispathPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) { // 폼 활성화인 경우
      ctx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) { // 이메일 활성화가 아닌 경우
      emailInputRef.current.focus();
    } else { // 이메일 활성화인 경우
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id='email'
          label='E-Mail'
          type='email'
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id='password'
          label='Password'
          type='password'
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
