import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from "../components/comments/Comments";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from '../lib/api';

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;
  
  const { sendRequest, status, data:loadedQuote, error} = useHttp(getSingleQuote, true);
  
  console.log(match);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if(status === 'pending') {
    return (
      <LoadingSpinner />
    );
  }

  if(error) {
    return (
      <p className="centered">{error}</p>
    );
  }

  // 유효성 검사
  if(!loadedQuote.text) {
    return (
      <p>No Quote Found.</p>
    );
  }


  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
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