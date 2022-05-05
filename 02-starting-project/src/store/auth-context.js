import React from 'react';

// context에 객체 저장
const AuthContext = React.createContext({
  isLoggedIn: false
});

export default AuthContext;