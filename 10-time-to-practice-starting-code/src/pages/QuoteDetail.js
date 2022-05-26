import { Fragment } from "react";
import { useParams, Route } from "react-router-dom";

import Comments from "../components/comments/Comments";

const QuoteDetail = () => {
  const params = useParams();

  return (
    <Fragment>
      <h1>Quotes Detail</h1>
      <p>{params.quoteId}</p>
      {/* 경로로 '/quotes/:quoteId/comments'도 가능 */}
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;