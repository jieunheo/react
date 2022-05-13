import React, { Component } from 'react';

import classes from './User.module.css';

// extends: 확장
class User extends Component {
  /*
  // 생성자 메소드
  constructor() {
    // 초기와 작업
  }
  */

  // 함수형 컴포넌트의 반환 문장과 동일
  // Component를 확장했기 때문에 this를 이용하여 props를 가져올 수 있음
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  };
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
