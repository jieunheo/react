// import { Component } from 'react';
import { useSelector, useDispatch/*, connect*/ } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  // redux store에 대한 action을 보냄
  const dispatch = useDispatch();

  // redux가 관리하는 counter
  // useSelector --> react-redux가 리덕스 스토어에 서브스크립션을 설정
  //                 -> 컴포넌트 업데이트
  const counter = useSelector(state => state.counter);

  // dispatch를 이용하여 counterReducer 가져오기
  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };

  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>increment</button>
        <button onClick={decrementHandler}>decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;

// class Counter extends Component{
//   // 생성자 - 초기화
//   // constructor() {}

//   // 메소드
//   incrementHandler() {
//     this.props.increment();
//   };

//   decrementHandler() {
//     this.props.decrement();
//   };

//   toggleCounterHandler() {};

//   // 리턴 - 출력값
//   // .bind(): javascript 함수 실행을 위함
//   render() {
//     return (
//       <main className={classes.counter}>
//         <h1>Redux Counter</h1>
//         <div className={classes.value}>{this.props.counter}</div>
//         <div>
//           <button onClick={this.incrementHandler.bind(this)}>increment</button>
//           <button onClick={this.decrementHandler.bind(this)}>decrement</button>
//         </div>
//         <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
//       </main>
//     );
//   };

// }

// // useSelector
// const mapStateToProps = state => {
//   return {
//     counter: state.counter
//   };
// }

// // useDispatch
// const mapDispatchToProps = dispatch => {
//   return {
//     increment: () => dispatch({ type: 'increment'}),
//     decrement: () => dispatch({ type: 'decrement'})
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Counter);