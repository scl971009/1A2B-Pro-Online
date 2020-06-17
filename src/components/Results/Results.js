import React from 'react';

const Results = (props) => {
  const {
    rowResults,
  } = props;
  const jsxPegs = [];

  let A = 0;
  let B = 0;
  let empty = 0;
  for (let i=0; i<rowResults.length; i+=1) {
    if(rowResults[i]==='white'){
      B+=1;
    }
    if(rowResults[i]==='red'){
      A+=1;
    }
    else{
      empty+=1;
    }
  }
  if(empty !== 4){
    jsxPegs.push((
      String(A)+'A'+String(B)+'B'
      ));
    }
  return <div>{jsxPegs}</div>;
};

export default Results;