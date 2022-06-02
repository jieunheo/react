import React from 'react';
import CSSTransition from "react-transition-group/CSSTransition";

import './Modal.css';

const animatingTiming = {
    enter: 400,
    exit: 1000
};

const modal = (props) => {
    return (
        <CSSTransition
            in={props.show}
            timeout={animatingTiming} /* 제거될 타이밍 */
            mountOnEnter /* in이 참이면 DOM에 wrap 요소 추가 */
            unmountOnExit /* DOM에서 완전히 제거 */
            classNames='fade-side'
            /*
            'fade-side'-enter-active
            'fade-side'-exit-active
            */
        >
            <div className='Modal'>
                <h1>A Modal</h1>
                <button className="Button" onClick={props.closed}>Dismiss</button>
            </div>
        </CSSTransition>
    );
};

export default modal;