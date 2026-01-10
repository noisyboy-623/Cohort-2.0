import React from 'react'
import { RiPhoneFill, RiMailFill, RiChat1Fill, RiVideoOnFill, RiCloseLine } from "@remixicon/react";

const Card = ({ user, closeCard, removeCard }) => {
  if (!user) return null;

  return (
    <div className='card' >
      <div className='details'>
        <div className="head">
          <RiCloseLine className='close-icon' onClick={closeCard} />
          <img src = {user.imageURL} />
          <h1>{user.name}</h1>
        </div>

        <div className="cta-buttons">
          <div className="cta"><RiPhoneFill /></div>
          <div className="cta"><RiChat1Fill /></div>
          <div className="cta"><RiVideoOnFill /></div>
          <div className="cta"><RiMailFill /></div>
        </div>

        <div className="container">
          <div className="dets">
            <RiPhoneFill />
            <div className="info">
              <p><strong>{user.number}</strong></p>
              <small>Mobile</small>
            </div>
          </div>

          <div className="dets">
            <RiMailFill />
            <div className="info">
              <p><strong>{user.email}</strong></p>
              <small>Email</small>
            </div>
          </div>
        </div>

        <div className="action-btn">
          {/* <button onClick={closeCard}>
            Go back
          </button> */}
          <button className='remove-btn' onClick={removeCard}>
            Remove user
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
