import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';

const NewQuotes = () => {
  const history = useHistory();

  const addQuoteHandler = quoteData => {
    const author = quoteData.author;
    const text = quoteData.text;

    history.push('/quotes'); // 뒤로 버튼을 통해 이전 페이지로 돌아갈 수 있음 -> 페이지 이동
    // history.replace(); // 뒤로 버튼으로 이전 페이지 못감 -> 새 페이지 추가
  };

  return (
    <QuoteForm onAddQuote={addQuoteHandler} />
  );
};

export default NewQuotes;