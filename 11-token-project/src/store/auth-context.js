import React, { useState, useEffect, useCallback } from "react";

// 타이머 저장 변수
let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {}
});

const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const adjExprationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExprationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token'); // 이전에 저장된 토큰
  const storedExpirationDate = localStorage.getItem('expirationTime'); // 토큰의 남은 시간

  const remainingTime = calculateRemainingTime(storedExpirationDate); //  만료 시간 계산
  if(remainingTime <= 60000) { // 만료시간이 1분 미만 남았다면
    // localStorege 삭제
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    return null;
  }

  // 있으면 값 리턴
  return {
    token: storedToken,
    duration: remainingTime
  };
};

export const AuthContextProvider = props => {
  const tokenData = retrieveStoredToken(); // 유효한 토큰 있는지 확인
  let initialToken; // 토큰 정보

  if(tokenData){ // 토큰 있다면
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token; // 빈문자열 = false, 값있음: true

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if(logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    // 토큰 만료시간이 되면 자동 로그아웃
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if(tokenData) {
      console.log(tokenData);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);
  
  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
};

export default AuthContext;