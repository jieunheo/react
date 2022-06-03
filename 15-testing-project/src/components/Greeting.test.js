import { render, screen } from '@testing-library/react';
import Greeting from './Greeting';

test('renders Hello World as a text', () => {
  // 1. 준비(Arrange) -> 테스트하고자 하는 컴포넌트 렌더링
  render(<Greeting />);

  // 2. 실행(Act) -> 버튼 클릭 시뮬레이션
  // 지금 테스트에서는 없음

  // 3. 단언(Assert) -> 브라우저상에 보이는 아웃풋 검토
  const helloWorldElement = screen.getByText('Hello World', { exact: false });
  expect(helloWorldElement).toBeInTheDocument();
});