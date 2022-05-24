import { useSelector } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  // redux가 관리하는 counter
  // useSelector --> react-redux가 리덕스 스토어에 서브스크립션을 설정
  //                 -> 컴포넌트 업데이트
  const counter = useSelector(state => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
