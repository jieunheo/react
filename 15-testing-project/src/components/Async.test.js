import { render, screen } from '@testing-library/react';

import Async from './Async';

describe('Async component', () => {
  test('renders posts if request secceeds', async () => {
    // 실제 서버에 요청하지 않고 비슷한 순서를 거쳐 더미 값을 제공하는 과정
    window.fetch = jest.fn(); // jest.fn: 더미 함수 만들어주기
    window.fetch.mockResolvedValueOnce({// 호출 시 결정되어야 할 값을 설정
      json: async () => [{
        id: 'p1',
        title: 'First post'
      }]
    });

    render(<Async />);

    // getAllByRole: 복수의 값을 가져오기
    const listItemElements = await screen.findAllByRole('listitem'/*, { exact }, { timeout } */);
    expect(listItemElements).not.toHaveLength(0); // 갯수가 0이아닌지
  });
});