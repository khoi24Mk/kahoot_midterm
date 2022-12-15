import React from 'react';

export default function Paragraph({ currentSlide }) {
  return <div className="px-5 text-center">{currentSlide?.options[0]}</div>;
}
