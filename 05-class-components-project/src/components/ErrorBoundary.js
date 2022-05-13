import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {hasError: false};
  }

  // 클래스 컴포넌트를 오류경계로 만들기
  componentDidCatch(error) {
    console.log(error);
    this.setState({hasError: true});
  };

  render(){
    if(!this.state.hasError) {
      return (<p>Something went wrog</p>);
    }
    return this.props.children;
  };
};

export default ErrorBoundary;