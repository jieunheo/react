import { useState, useEffect } from 'react';

// useXXX
// 리액트에게 해당 함수를 커스텀 훅 규칙에 따라 사용하겠다고 알림
const useCounter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return counter;
};

export default useCounter;