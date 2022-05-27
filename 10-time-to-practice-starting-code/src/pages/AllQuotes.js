import { useEffect } from "react";

import QuoteList from "../components/quotes/QuoteList";
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from '../lib/api';

const AllQuotes = () => {
  const { sendRequest, status, data: loadedQuotes, error } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // 로딩중인 경우
  if(status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  // error
  if(error) {
    return <p className='centered focused'>{error}</p>
  }

  // error는 아니지만 값이 없는 경우
  if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return (
      <NoQuotesFound />
    );
  }

  return (
      <QuoteList quotes={loadedQuotes} />
  );
};

export default AllQuotes;