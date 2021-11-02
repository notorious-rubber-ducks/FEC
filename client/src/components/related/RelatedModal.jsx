import React from 'react';

export default function RelatedModal({ closeModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button type="button" onClick={() => { closeModal(false); }}>X</button>
        </div>
        <div className="title">COMPARISON</div>
        <div className="body">
          <span>one</span>
          <span>two</span>
        </div>
      </div>
    </div>
  );
}
