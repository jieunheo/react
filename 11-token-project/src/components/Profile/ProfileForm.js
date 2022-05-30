import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history = useHistory();

  const authContext = useContext(AuthContext);
  const passwordInputRef = useRef();

  const submitHandler = event => {
    event.preventDefault();

    const enteredNewPassword = passwordInputRef.current.value;

    // 유효성 검사 코드 작성 위치
    if(enteredNewPassword) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBqKZUYad3ra3mARIvpWbyzs6Uj_Sj48xg',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: authContext.token,
            password: enteredNewPassword,
            returnSecureToken: false
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        if(res.ok) {
          // 비밀번호 변경 성공
          history.replace('/');

          return res.json();
        } else {
          // 실패
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
        console.log(data);
      })
      .catch(error => {
        alert(error.message);
      });
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={passwordInputRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
