import React, { Component } from "react";
import Transition from "react-transition-group/Transition";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBack: false
  }

  showModal = () => {
    this.setState({modalIsOpen: true});
  };

  closeModal = () => {
    this.setState({modalIsOpen: false});
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button className="Button" onClick={() => this.setState(prevState => ({showBack: !prevState.showBack}))}>
          Toggle
        </button>
        <br />
        <Transition
          in={this.state.showBack}
          timeout={1000} /* 제거될 타이밍 */
          mountOnEnter /* in이 참이면 DOM에 wrap 요소 추가 */
          unmountOnExit /* DOM에서 완전히 제거 */
        >
          {state => (
            <div
              style={{
                backgroundColor: 'red',
                width: 100,
                height: 100,
                margin: 'auto',
                transition: 'all 1s ease-out',
                opacity: state ==='exiting' ? 0 : 1
              }}
            />
          )}
        </Transition>
        <Transition
          in={this.state.modalIsOpen}
          timeout={300} /* 제거될 타이밍 */
          mountOnEnter /* in이 참이면 DOM에 wrap 요소 추가 */
          unmountOnExit /* DOM에서 완전히 제거 */
        >
          {state => (
            // 어떤 것이 렌더링 되어야 하는지 정의
            <Modal show={state} closed={this.closeModal} />
          )}
        </Transition>
        {this.state.modalIsOpen ? '' : null}
        {this.state.modalIsOpen ? <Backdrop show={this.state.modalIsOpen} closed={this.closeModal} /> : null}
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
