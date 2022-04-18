import React from 'react';

import Expenses from "./components/Expenses/Expenses";

const App = () => {
  const expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: 'e2',
      title: 'New TV',
      amount: 799.49,
      date: new Date(2021, 2, 12)
    },
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  return (
    <div>
      <h2>시작</h2>
      <Expenses items={expenses} />
    </div>
  );

//   React에서 JSX를 아래와 같이 번환함
//   return React.createElement(
//           'div',
//           {},
//           React.createElement('h2', {}, '시작'),
//           React.createElement(Expenses, { items: expenses})
//         );
// }

}

export default App;
