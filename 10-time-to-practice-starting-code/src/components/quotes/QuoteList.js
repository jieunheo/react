import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// useHistory: URL을 바꿀 수 있게 함
// useLocation: history 객체에 접속하게 해줌
//              -> 최근 로드된 페이지와 URL에 대한 정보가 들어있음

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

// sort code
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search); // javacript 기본 함수
  // queryParams = {sort: 'asc'}
  const isSortAscending = queryParams.get('sort') === 'asc'; // 해당 키의 값 가져오기

  const sortedQuotes = sortQuotes(props.quotes, isSortAscending);

  const changeSortHandler = () => {
    history.push('/quotes?sort=' + (isSortAscending ? 'desc' : 'asc'));
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortHandler}>Sort {isSortAscending ? 'Descending' : 'Ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
