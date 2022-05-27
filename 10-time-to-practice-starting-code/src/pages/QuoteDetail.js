import { Fragment } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from "../components/comments/Comments";

const DUMMY_QUOTES = [
  { id: 'q1', author: 'hong', text: 'Learning React!' },
  { id: 'q2', author: 'heo', text: 'Learning Javascript!' }
];

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  console.log(match);

  const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

  // 유효성 검사
  if(!quote) {
    return (
      <p>No Quote Found.</p>
    );
  }


  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.url} exact>
        {/* 클릭 해서 경로가 이동되면 exact 속성으로 인해 해당 버튼은 보여지지 않음 */}
        <div className='centered'>
          <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
        </div>
      </Route>

      {/* 경로로 '/quotes/:quoteId/comments'도 가능 */}
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;