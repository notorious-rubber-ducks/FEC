import axios from 'axios';
import React, { useContext, useState } from 'react';
import AppContext from '../../hooks/context';

export default function QuestionModal({ closeModal }) {
  const currItem = useContext(AppContext).defaultItem;

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [failed, setFailed] = useState(false);
  const [failedFields, setFailedFields] = useState([]);

  let fails = [];

  const FailedDOM = function () {
    return (
      <p>
        You must enter the following:
        {' '}
        {failedFields.map((fail) => `${fail} `)}
      </p>
    );
  };

  const handleSubmit = function () {
    fails = [];
    // validate forms
    if (nickname !== ''
      && email !== ''
      && email.includes('@')
      && email.includes('.')
      && question !== '') {
      // submit form
      axios.post(`${process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3000/'}qa/questions`, {
        body: question, name: nickname, email, product_id: currItem.id,
      })
        .then(() => {
          closeModal(false);
        })
        .catch((err) => console.error(err));
    } else {
      if (nickname === '') {
        fails.push('Nickname');
      }
      if (email === '' || (!email.includes('@') && !email.includes('.'))) {
        fails.push('Email');
      }
      if (question === '') {
        fails.push('Question');
      }
      setFailedFields(fails);
      setFailed(true);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="title">
          <h4>Ask a Question</h4>
          <p style={{ fontSize: 12 }}>Fields denoted with an (*) are mandatory</p>
        </div>
        <div className="body">
          <form>
            <label>Nickname *</label>
            <br />
            <input type="text" placeholder="Example: jackson11!" onChange={(e) => setNickname(e.target.value)} />
            <p>For privacy reasons, do not use your full name or email address</p>
            <br />
            <label>Email *</label>
            <br />
            <input type="email" placeholder="Example: jackson11@email.com" onChange={(e) => setEmail(e.target.value)} />
            <p style={{ fontSize: 10 }}>For authentication reasons, you will not be emailed</p>
            <label>Ask your question *</label>
            <br />
            <textarea maxLength="1000" style={{ width: 400 }} onChange={(e) => setQuestion(e.target.value)} />
            {failed && <FailedDOM />}
          </form>
          <br />
        </div>
        <div className="footer">
          <button onClick={() => closeModal(false)}> Cancel </button>
          <button onClick={handleSubmit}> Submit</button>
        </div>
      </div>
    </div>
  );
}
