import React, { useState } from "react";

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {}
});

// 만료 시간 계산 함수
const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const adjExprationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExprationTime - currentTime;

  return remainingDuration;
};

export const AuthContextProvider = props => {
  const initialToken = localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token; // 빈문자열 = false, 값있음: true

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  }

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);

    const remainingTime = calculateRemainingTime(expirationTime);

    // 토큰 만료시간이 되면 자동 로그아웃
    setTimeout(logoutHandler, remainingTime);
  }
  
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