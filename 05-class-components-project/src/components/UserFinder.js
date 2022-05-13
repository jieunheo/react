import { Fragment, useState, useEffect, Component } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/users-context';
import ErrorBoundary from './ErrorBoundary';

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super(); // Component의 생성자 호출
    this.state = {
      filteredUsers: [],
      searchTerm: ''
    };
  };

  // 컴포넌트 처음 렌더링 시 호출
  componentDidMount() {
    // send http request...
    this.setState({
      filteredUsers: this.context.users
    })
  };

  // 컴포넌트 재평가 시 자동 호출 -> useEffect 대체
  componentDidUpdate(prevProps, prevState) {
    // 무한 루프를 없애기 위한 조건
    if(prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter((user) => 
          user.name.includes(this.state.searchTerm)
        )
      });
    }
  };

  searchChangeHandler(event) {
    this.setState({searchTerm: event.target.value});
  }
  
  render() {
    return (
      <Fragment>
        {/* <UsersContext.Consumer></UsersContext.Consumer> */}
        <div className={classes.finder}>
          <input type='search' onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  };
};

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter((user) => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type='search' onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;