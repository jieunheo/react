import React, { useState, useCallback, useMemo } from 'react';

import Button from './components/UI/Button/Button';
import DemoList from './components/Demo/DemoList';
import './App.css';

function App() {
  const [listTitle, setLisrTitle] = useState('My List');
  
  // useCallback: 가상의 공간에 해당 값을 저장한 후 그 값이 수정되는지 확인
  const changeTitleHaldler = useCallback(() => {
    setLisrTitle('New Title');
  }, []);

  // item이 다시 호출되지 않도록 useMemo로 값을 따로 저장
  const listItems = useMemo(() => [5, 3, 1, 10, 9]);

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems}/>
      <Button onClick={changeTitleHaldler}>Change List Title!</Button>
    </div>
  );
}

export default App;
