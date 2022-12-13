import React from 'react';

export default function Heading({ editingSlide }) {
  return (
    <div className="px-5 text-center" style={{ fontSize: '1.2rem' }}>
      {editingSlide?.options[0]}
    </div>
  );
}
