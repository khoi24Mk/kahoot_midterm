import React from 'react';

export default function Paragraph({ editingSlide }) {
  return <div className="px-5 text-center">{editingSlide?.options[0]}</div>;
}
