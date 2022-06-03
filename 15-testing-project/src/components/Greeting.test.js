import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greeting from './Greeting';

// test: 낱개 테스트
// describe: 테스트 그룹
describe('Greeting component', () => {
  test('renders "Hello World" as a text', () => {
    // 1. 준비(Arrange) -> 테스트하고자 하는 컴포넌트 렌더링
    render(<Greeting />);
  
    // 2. 실행(Act) -> 버튼 클릭 시뮬레이션
    // 지금 테스트에서는 없음
  
    // 3. 단언(Assert) -> 브라우저상에 보이는 아웃풋 검토
    const helloWorldElement = screen.getByText('Hello World', { exact: false });
    expect(helloWorldElement).toBeInTheDocument();
  });

  test('renders "good to see you" if the button was NOT clicked', () => {
    render(<Greeting />);

    const outputElement = screen.getByText('good to see you!', { exact: false });
    expect(outputElement).toBeInTheDocument();
  });

  test('renders "Changed!" if the button was clicked', () => {
    render(<Greeting />);

    // 실행
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    const outputElement = screen.getByText('Changed!'/*, { exact: false }*/);
    expect(outputElement).toBeInTheDocument();
  });

  test('does not render "good to see you" if the button was clicked', () => {
    render(<Greeting />);

    // 실행
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // queryByText: 없는 값을 찾을 때 -> null
    const outputElement = screen.queryByText('good to see you', { exact: false });
    expect(outputElement).toBeNull(); // null인지 확인
  });
});
