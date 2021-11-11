import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../../hooks/context';
import axios from 'axios';
import SingleQuestion from './SingleQuestion.jsx';
import QuestionModal from './AddQuestionModal.jsx';

export default function Questions({ captureMetaData }) {
  let currItem = useContext(AppContext).defaultItem;

  let [questions, setQuestions] = useState([]);
  let [additional, setAdditional] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [searchTerm, setSearchTerm] = useState('');
  let [activeSearch, setActiveSearch] = useState(false);
  let [matchingQuestions, setMatchingQuestions] = useState([]);

  let showMore;

  useEffect( () => {
    setAdditional(false);
    axios.get(`/qa/questions/?product_id=${currItem.id}&count=100`)
    .then(({ data }) => {
      //console.log(data);
      setQuestions(data.results);
    })
    .catch((err) => err);

  }, [currItem]);

  const showAdditional = function () {
    setAdditional(true);
  };

  const getSearch = function (e) {
    setSearchTerm(e.target.value.toLowerCase());
    if (searchTerm.length >= 3) {
      runSearch();
    }
    if (searchTerm.length < 3) {
      setActiveSearch(false);
    }
  }

  const runSearch = function () {
    let currMatches = questions.map(q => {
      if (q.question_body.toLowerCase().includes(searchTerm)) {
        return (<div key={q.question_id}><SingleQuestion q={q} /><br /></div>)
      }
    });
    setMatchingQuestions(currMatches);
    setActiveSearch(true);
  }

  let renderedQuestions = questions.map((question, index) => {
    if (index < 4 || additional){
      return (<div key={question.question_id}><SingleQuestion q={question}/><br/> </div>)
    }
  });

  if (questions.length > 4 && !additional) {
    showMore = (<button style={{float: 'left'}} onClick={showAdditional}>More Answered Questions</button>);
  } else {
    showMore = (<div></div>);
  }

  return (
    <div id='questions' onClick={e => captureMetaData(e, 'questions')}>
      {showModal && <QuestionModal closeModal={setShowModal}/>}
      <h2>QUESTIONS {'&'} ANSWERS</h2>
      <div>
        <input type='text' placeholder='Have a question? Search for answers...' className='qSearch' onChange={getSearch}/>
      </div>
      <div className='scrollable' style={{border: '1px solid black', maxHeight: 600, overflowY:'scroll'}}>
        {activeSearch ? matchingQuestions : renderedQuestions}
      </div>
      <br/>
      <span>
        {showMore}
        <button style={{float:'right'}} onClick={() => setShowModal(true)}>Ask a Question +</button>

      </span>
    </div>
  );
};