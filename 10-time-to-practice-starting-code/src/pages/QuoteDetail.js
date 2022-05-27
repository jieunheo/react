import { Fragment } from "react";
import { useParams, Route, Link } from "react-router-dom";

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from "../components/comments/Comments";

const DUMMY_QUOTES = [
  { id: 'q1', author: 'hong', text: 'Learning React!' },
  { id: 'q2', author: 'heo', text: 'Learning Javascript!' }
];

const QuoteDetail = () => {
  const params = useParams();

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
      <Route path={`/quotes/${params.quoteId}`} exact>
        {/* 클릭 해서 경로가 이동되면 exact 속성으로 인해 해당 버튼은 보여지지 않음 */}
        <div className='centered'>
          <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>Load Comments</Link>
        </div>
      </Route>
      
      {/* 경로로 '/quotes/:quoteId/comments'도 가능 */}
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;