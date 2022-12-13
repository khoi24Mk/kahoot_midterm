import React from 'react';

export default function People({ img, name, endElement, me }) {
  return (
    <div className="d-flex justify-content-between py-3 px-2">
      <div className="d-flex align-items-center">
        <img
          style={{ height: '2rem', width: '2rem' }}
          className="rounded-circle"
          src={img || '/defaultAvatar.png'}
          alt=""
        />
        <div className={`${me ? 'fw-bold' : ''} ms-2`}>{name}</div>
      </div>

      {endElement}
    </div>
  );
}
