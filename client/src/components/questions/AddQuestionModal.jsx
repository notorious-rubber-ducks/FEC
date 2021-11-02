import React, { useState } from "react";


export default function QuestionModal ({ closeModal }) {

  let [nickname, setNickname] = useState('');
  let [email, setEmail] = useState('');
  let [question, setQuestion] = useState('');
  let [failed, setFailed] = useState(false);
  let [failedFields, setFailedFields] = useState([]);

  let fails = [];

  const FailedDOM = function () {
    console.log('in component', failedFields)
    return (
      <p>You must enter the following: {failedFields.map(fail => `${fail} `)}</p>
    )
  }

  const handleSubmit = function () {
    fails = [];
    //validate forms
    if (nickname !== ''
      && email !==''
      && email.includes('@')
      && email.includes('.')
      && question !== '') {
        //submit form
        console.log('all fields are valid');
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
      console.log(fails)
      setFailedFields(fails);
      setFailed(true);
    }
  }

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
          <button onClick={() => closeModal(false)} >X</button>
        </div>
        <div className='title'>
          <h4>Ask a Question</h4>
          <p style={{fontSize:12}}>Fields denoted with an (*) are mandatory</p>
        </div>
        <div className='body'>
          <form>
            <label>Nickname *</label>
            <br/>
            <input type='text' placeholder='Example: jackson11!' onChange={e => setNickname(e.target.value)}></input>
            <p>For privacy reasons, do not use your full name or email address</p>
            <br/>
            <label>Email *</label>
            <br/>
            <input type='email' placeholder='Example: jackson11@email.com' onChange={e => setEmail(e.target.value)}></input>
            <p style={{fontSize:10}}>For authentication reasons, you will not be emailed</p>
            <label>Ask your question *</label>
            <br/>
            <textarea maxLength='1000' style={{width:400}} onChange={e => setQuestion(e.target.value)}></textarea>
            {failed && <FailedDOM />}
          </form>
          <br/>
        </div>
        <div className='footer'>
          <button onClick={() => closeModal(false)}> Cancel </button>
          <button onClick={handleSubmit}> Submit</button>
        </div>
      </div>
    </div>
  );
}


