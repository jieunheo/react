import React, { useState, useCallback } from 'react';

import Button from './components/UI/Button/Button';
import DemoList from './components/Demo/DemoList';
import './App.css';

function App() {
  const [listTitle, setLisrTitle] = useState('My List');
  
  // useCallback: 가상의 공간에 해당 값을 저장한 후 그 값이 수정되는지 확인
  const changeTitleHaldler = useCallback(() => {
    setLisrTitle('New Title');
  }, []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={[5, 3, 1, 10, 9]}/>
      <Button onClick={changeTitleHaldler}>Change List Title!</Button>
    </div>
  );
}

export default App;
