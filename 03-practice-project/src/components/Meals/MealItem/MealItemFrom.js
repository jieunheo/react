import React from 'react';

import Input from '../../UI/Input';
import classes from './MealItemFrom.module.css';

const MealItemFrom = props => {
  return (
    <from className={classes.form}>
      <Input
        label='Amount'
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }}
      />
      <button>+ Add</button>
    </from>
  );
}

export default MealItemFrom;