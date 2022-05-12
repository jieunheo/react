import React from 'react';

import MyParagraph from './MyParagraph';

const DemoOutput = props => {
  console.log('DemoOutput RUNNING!');
  return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>;
};

// React.memo: 인자로 입력되는 컴포넌트의 모든 props 신규 값을 확인한 뒤
//             기존 props 값과 비교하도록 리액트에 전달
//             -> props가 수정된 경우에만 컴포넌트를 재실행 및 재평가
export default React.memo(DemoOutput);