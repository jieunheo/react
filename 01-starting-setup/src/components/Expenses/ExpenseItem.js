import React/*, { useState }*/ from 'react';

import ExpenseDate from './ExpenseDate';
import Card from "../UI/Card";

import './ExpenseItem.css';

const ExpenseItem = props => {
  //React Hook이라고 불림
  //Component 안에서 호출 되어야 함
  //첫번째 값: 변수 자체인 배열 반환
  //두번째 값: 업데이트되는 함수
  //=> 배열구조분해 사용
  // const [title, setTitle] = useState(props.title);

  // const clickHandler = () => {
  //   setTitle('Update!');
  // }

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      {/* <button onClick={clickHandler}>Change Title</button> */}
    </Card>
  );
}

export default ExpenseItem;