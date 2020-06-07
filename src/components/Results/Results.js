import React from 'react';
import Peg from '../Peg';

const Results = (props) => {
  const {
    index,
    rowResults,
  } = props;
  const jsxPegs = [];
  for (let i=0; i<rowResults.length; i+=1) {
    jsxPegs.push((
      rowResults[i] && <Peg colour={rowResults[i]} result key={`result-${index}-${i}`} />
    ));
  }
  return <div>{jsxPegs}</div>;
};

export default Results;