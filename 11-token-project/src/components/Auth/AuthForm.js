import { useState, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authContext = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = event => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    setIsLoading(true);
    let url;

    // 로그인모드인지 확인
    if(isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBqKZUYad3ra3mARIvpWbyzs6Uj_Sj48xg';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBqKZUYad3ra3mARIvpWbyzs6Uj_Sj48xg';
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: { // 전달 데이터의 형식 작성
          'Content-Type': 'application/json'
        }
      }
    )
    .then(res => {
      setIsLoading(false);
      
      if(res.ok) {
        // 성공시 진행
        return res.json();
      } else {
        // 실패시 진행
        return res.json().then(data => {
          // 에러 모달 띄우기
          const errorMessage = 'Authentication failed!';
          // 에러값에 따른 메세지 보여주기
          // if(data && data.error && data.error.message) {
          //   errorMessage = data.error.message;
          // }
          
          // error메세지를 catch문으로 이동
          throw new Error(errorMessage);
        });
      }
    })
    .then(data => {
      // 만료 시간 구하기
      const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));

      // 토큰과 구한 시간 넘기기
      authContext.login(data.idToken, expirationTime.toISOString());

      history.replace('/');
    })
    .catch(error => {
      alert(error.message);
    });
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef} />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
