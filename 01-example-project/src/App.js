import React, { useState } from 'react';

import AddUser from './components/Users/AddUser';
import UsersList from './components/Users/UsersList';

const App = () => {
  const [usersList, setUsersList] = useState([]);
  
  // 내가 혼자 한 방식
  // const addUserHandler = user => {
  //   setUsersList(prevUsersList => [user, ...prevUsersList]);
  // }
  const addUserHandler = (nUsername, nAge) => {
    setUsersList(prevUsersList => [
      {
        id: Math.random().toString(),
        name: nUsername,
        age: nAge
      },
     ...prevUsersList
    ]);
  }

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      {usersList.length !== 0 && <UsersList users={usersList} />}
    </div>
  );
}

export default App;
