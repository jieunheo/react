import React, { useState, useCallback } from 'react';

import Button from './components/UI/Button/Button';
import './App.css';
import DemoOutput from './components/Demo/DemoOutput';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);

  console.log('APP RUNNING!');

  // useCallback: 가상의 공간에 해당 값을 저장한 후 그 값이 수정되는지 확인
  const toggleParagraphHaldler = useCallback(() => {
    if(allowToggle) {
      setShowParagraph(prevParagraph => !prevParagraph);
    }
  }, [allowToggle]);

  const allowToggleHandler = () => {
    setAllowToggle(true);
  }

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph} />
      <Button onClick={allowToggleHandler}>Allow Toggle!</Button>
      <Button onClick={toggleParagraphHaldler}>Show Paragraph!</Button>
    </div>
  );
}

export default App;
