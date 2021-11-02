import React, { useState, useEffect} from "react";
import axios from "axios";
import Answer from "./Answers.jsx";
import Helpful from "../shared/Helpful.jsx";



export default function SingleQuestion ({q}) {

  let answerIds = Object.keys(q.answers);

  let firstTwo  = [answerIds[0], answerIds[1]];

  let [answersElements, setAnswersElements] = useState([]);

  let showMore;

  const showOnClick = function () {
    setAnswersElements(answerIds.map(a => {
      if (a !== undefined) {
        return (<div key={q.answers[a].id}><Answer id={q.answers[a]}/></div>)
      }
    }));
  };

  if (answerIds.length > 2) {
    showMore = (<div><button onClick={showOnClick}>See More Answers</button></div>)
  } else {
    showMore = (<div></div>)
  }

  if (!answersElements.length) {
    setAnswersElements(firstTwo.map(a => {
      if (a !== undefined) {
        return (<div key={q.answers[a].id}><Answer id={q.answers[a]}/></div>)
      }
    }));
  }


  //console.log(answersElements);

  let style = {
    border: '2px solid black',
    borderRadius: '3px',
    padding: '3px'
  }

  let fontStyle = {
    fontSize: 19,
    fontWeight: 'bold'
  }

  return (
    <div style={style}>
      <span>
        <span style={fontStyle}>
          Q: {q.question_body}
        </span>
        <a style={{float:'right', textDecoration:'underline', color:'blue', fontSize:12}}>Add Answer</a>
        <Helpful calledFrom='q' id={q.id} helpfulness={q.question_helpfulness}/>
      </span>
      {answersElements}
      {showMore}
    </div>
  );
}


//<div key={q.answers[a].id}><Answer id={q.answers[a]}/></div>