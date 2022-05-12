import React, { useState } from 'react';

import Button from './components/UI/Button/Button';
import './App.css';
import DemoOutput from './components/Demo/DemoOutput';

function App() {
  const [showParagraph, setShowParagraph] = useState(false);

  console.log('APP RUNNING!');

  const toggleParagraphHaldler = () => {
    setShowParagraph(prevParagraph => !prevParagraph);
  }

  return (
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false} />
      <Button onClick={toggleParagraphHaldler}>Show Paragraph!</Button>
    </div>
  );
}

export default App;
