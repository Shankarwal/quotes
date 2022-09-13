import { Fragment } from "react";

import classes from "./HighlightedQuote.module.css";

const HighlightedQuote = (props) => {
  return (
    <Fragment>
      <section>
        <figure className={classes.quote}>
          <p>{props.text}</p>
          <figcaption>{props.author}</figcaption>
        </figure>
      </section>
    </Fragment>
  );
};

export default HighlightedQuote;
