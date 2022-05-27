import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuotes = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  // 상태가 completed인지 확인
  useEffect(() => {
    if(status === 'completed') { // 맞는 경우에만 push
      history.push('/quotes');
    }
  }, [status, history]);

  const addQuoteHandler = quoteData => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuotes;