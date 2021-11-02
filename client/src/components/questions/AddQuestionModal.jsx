import React from "react";


export default function QuestionModal ({ closeModal }) {
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
          <button onClick={() => closeModal(false)} >X</button>
        </div>
        <div className='title'>
          <h3>Ask a Question</h3>
        </div>
        <div className='body'>
          placeholder
        </div>
        <div className='footer'>
          <button onClick={() => closeModal(false)}> cancel </button>
          <button> submit</button>
        </div>
      </div>
    </div>
  );
}


