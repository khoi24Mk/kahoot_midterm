import React from 'react';

export default function Heading({ currentSlide }) {
  return (
    <div className="px-5 text-center" style={{ fontSize: '1.2rem' }}>
      {currentSlide?.options[0]}
    </div>
  );
}
