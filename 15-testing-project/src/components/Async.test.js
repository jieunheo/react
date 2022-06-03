import { render, screen } from '@testing-library/react';

import Async from './Async';

describe('Async component', () => {
  test('renders posts if request secceeds', async () => {
    render(<Async />);

    // getAllByRole: 복수의 값을 가져오기
    const listItemElements = await screen.findAllByRole('listitem'/*, { exact }, { timeout } */);
    expect(listItemElements).not.toHaveLength(0); // 갯수가 0이아닌지
  });
});