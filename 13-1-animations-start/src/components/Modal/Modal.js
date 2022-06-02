import React from 'react';
import Transition from "react-transition-group/Transition";

import './Modal.css';

const animatingTiming = {
    enter: 400,
    exit: 1000
};

const modal = (props) => {
    return (
        <Transition
            in={props.show}
            timeout={animatingTiming} /* 제거될 타이밍 */
            mountOnEnter /* in이 참이면 DOM에 wrap 요소 추가 */
            unmountOnExit /* DOM에서 완전히 제거 */
        >
            {state => {
                const cssClasses = [
                    'Modal',
                    state === 'entering'
                    ? 'ModalOpen'
                    : state === 'exiting' ? 'ModalClosed' : null
                ];
                

                return (
                    <div className={cssClasses.join(' ')}>
                        <h1>A Modal</h1>
                        <button className="Button" onClick={props.closed}>Dismiss</button>
                    </div>
                );
            }}
        </Transition>
    );
};

export default modal;