import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
  logout: () => {}
});

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const loginHandler = () => {
    setIsAuthenticated(true);
  }

  const logoutHandler = () => {
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{
      isAuth: isAuthenticated,
      login: loginHandler,
      logout: logoutHandler
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;