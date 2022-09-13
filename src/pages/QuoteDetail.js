import { Fragment, useEffect} from "react";
import { Route, Link, useParams, useRouteMatch } from "react-router-dom";

import "../index.css";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import Comments from "../components/comments/Comments";
import LoadingSpinner from "../components/UI/LoadingSpinner";


const QuoteDetail = () => {
  
  const {sendRequest, status, error, data:loadedQuote} = useHttp(getSingleQuote, true);
  const params = useParams();
  const match = useRouteMatch();

  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId)
  },[sendRequest, quoteId])

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if(error){
    return <p className="centered focused">{error}</p>
  }

  if(status === 'completed' && !loadedQuote){
    return <NoQuotesFound />
  }

  return (
    <Fragment>
      <HighlightedQuote id={loadedQuote.id} text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
        <p className="centered">
          <Link to="/quotes">Go back</Link>
        </p>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
        <p className="centered">
          <Link to={`${match.url}`}>Go back</Link>
        </p>
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
