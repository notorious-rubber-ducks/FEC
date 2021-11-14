import React from 'react';

export default function ImageModal({ closeModal, image }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className="body">
          <img src={image} />
        </div>
      </div>
    </div>
  );
}
