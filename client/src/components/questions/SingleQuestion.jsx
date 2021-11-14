import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Answer from './Answers.jsx';
import Helpful from '../shared/Helpful.jsx';
import AppContext from '../../hooks/context.js';
import AnswerModal from './AddAnswerModal.jsx';

export default function SingleQuestion({ q }) {
  const currItem = useContext(AppContext).defaultItem;

  let answerIds = Object.keys(q.answers);
  let firstTwo = [answerIds[0], answerIds[1]];

  const [allAnswersElements, setAllAnswersElements] = useState([]);
  const [firstTwoElements, setFirstTwoElements] = useState([]);
  const [additional, setAdditional] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const showOnClick = function () {
    setAdditional(true);
  };

  const hideOnClick = function () {
    setAdditional(false);
  };

  let showMore;
  const collapse = (<div><button onClick={hideOnClick}>Collapse Answers</button></div>);

  if (answerIds.length > 2 && !additional) {
    showMore = (<div><button onClick={showOnClick}>See More Answers</button></div>);
  } else {
    showMore = (<div />);
  }

  useEffect(() => {
    answerIds = Object.keys(q.answers);
    firstTwo = [answerIds[0], answerIds[1]];
    setFirstTwoElements(firstTwo.map((a) => {
      if (a !== undefined) {
        return (<div key={q.answers[a].id}><Answer id={q.answers[a]} /></div>);
      }
    }));
    setAllAnswersElements(answerIds.map((a) => {
      if (a !== undefined) {
        return (<div key={q.answers[a].id}><Answer id={q.answers[a]} /></div>);
      }
    }));
  }, [currItem]);

  const style = {
    border: '2px solid black',
    borderRadius: '3px',
    padding: '3px',
  };

  const fontStyle = {
    fontSize: 19,
    fontWeight: 'bold',
  };

  return (
    <div style={style}>
      {showModal && <AnswerModal closeModal={setShowModal} question={q.question_id} />}
      <span>
        <span style={fontStyle}>
          Q:
          {' '}
          {q.question_body}
        </span>
        <a
          style={{
            float: 'right', textDecoration: 'underline', color: 'blue', fontSize: 12,
          }}
          onClick={() => setShowModal(true)}
        >
          Add Answer
        </a>
        <Helpful calledFrom="q" id={q.question_id} helpfulness={q.question_helpfulness} />
      </span>
      {additional ? allAnswersElements : firstTwoElements}
      {additional ? collapse : showMore}
    </div>
  );
}
