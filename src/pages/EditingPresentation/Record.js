import React from 'react';

export default function Record({ record }) {
  return (
    <div className="bg-light p-3 rounded-2">
      <div
        style={{ color: 'gray' }}
        className="d-flex justify-content-between mb-3"
      >
        <div>{record?.user?.displayName}</div>
        <div>{new Date(record?.dateCreated).toLocaleString('en-US')}</div>
      </div>
      <div className="fw-bold">{record?.answer}</div>
    </div>
  );
}
