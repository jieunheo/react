import React, { useState, Component } from 'react';
import User from './User';

import classes from './Users.module.css';

class Users extends Component {
  // 초기화: 첫 호출 시 하는 것
  constructor() {
    super();
    // state를 객체와 같게 설정 - useState와 유사
    // 무조건 객체로만 생성
    this.state = {
      showUsers: true
    };

  }

  componentDidUpdate() {
    if(this.props.users.length === 0) {
      // 가져온 값이 없는 경우 error 강제로 띄우기
      throw new Error('No users provided!');
    }
  };

  // 상태정의: 필요할 떄 업데이트
  toggleUsersHandler = () => {
    // this.state.showUsers = false; //NOT
    this.setState((curState) => {
      return {showUsers: !curState.showUsers}
    });
  };

  render() {
    const usersList = (
      <ul>
        {this.props.users.map((user) => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map((user) => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
