import React from 'react';

import classes from './Input.module.css';

// forwardRef: 상위 컴포넌트에서 useRef를 이용하여 넘겨주는 ref 값을 받아
//             해당 인풋에 접근할 수 있다.
const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});
 export default Input;