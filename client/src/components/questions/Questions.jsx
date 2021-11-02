import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../hooks/context';
import axios from 'axios';
import SingleQuestion from './SingleQuestion.jsx';
import QuestionModal from './AddQuestionModal.jsx';

export default function Questions() {
  let currItem = useContext(AppContext).defaultItem;
  //console.log(currItem);
  //
  let [questions, setQuestions] = useState([]);
  let [additional, setAdditional] = useState(false);
  let [showBtn, setShowBtn] = useState(false);
  let [showModal, setShowModal] = useState(false);

  let showMore;

  useEffect( () => {
    setAdditional(false);
    axios.get(`/qa/questions/?product_id=${currItem.id}&count=10`)
      .then(({ data }) => {
        //console.log(data);
        setQuestions(data.results);
      })
      .catch((err) => err);

  }, [currItem]);

  const showAdditional = function () {
    setAdditional(true);
  };

  //console.log(questions);

  if (questions.length > 4 && !additional) {
    showMore = (<button style={{float: 'left'}} onClick={showAdditional}>More Answered Questions</button>);
  } else {
    showMore = (<div></div>);
  }

  return (
    <div>
      {showModal && <QuestionModal closeModal={setShowModal}/>}
      <h2>Questions {'&'} Answers</h2>
      <div className='scrollable' style={{border: '1px solid black', maxHeight: 600, overflowY:'scroll'}}>
        {questions.map((question, index) => {
          if (index < 4 || additional){
            return (<div key={question.question_id}><SingleQuestion q={question}/><br/> </div>)
          }
        })}
      </div>
      <br/>
      <span>
        {showMore}
        <button style={{float:'right'}} onClick={() => setShowModal(true)}>Ask a Question +</button>

      </span>
    </div>
  );
};