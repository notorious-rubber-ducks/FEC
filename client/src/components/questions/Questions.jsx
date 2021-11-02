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
  let [showModal, setShowModal] = useState(false);

  let showMore;

  useEffect( () => {
    axios.get(`/qa/questions/?product_id=${currItem.id}&count=10`)
      .then(({ data }) => {
        //console.log(data);
        setQuestions(data.results);
      })
      .catch((err) => err);

  }, []);

  const showAdditional = function () {
    console.log('show additional clicked')
    setAdditional(true);
  };

  //console.log(questions);

  if (questions.length > 4) {
    showMore = (<button style={{float: 'left'}} onClick={showAdditional}>More Answered Questions</button>);
  } else {
    showMore = (<div></div>);
  }

  return (
    <div>
      {showModal && <QuestionModal closeModal={setShowModal}/>}
      <h2>Questions {'&'} Answers</h2>
      <div className='scrollable' style={{border: '1px solid black', maxHeight: 600,'overflow-y':'scroll'}}>
        {questions.map((question, index) => {
          if (index < 4 || additional){
            return (<div key={question.id}><SingleQuestion q={question}/><br/> </div>)
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