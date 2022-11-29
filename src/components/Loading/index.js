/* eslint-disable no-unused-vars */
import React from 'react';
// import { Spinner } from 'react-bootstrap';
import HashLoader from 'react-spinners/HashLoader';

export default function Loading({ msg }) {
  console.log('Loading');
  console.log(msg);
  return (
    <div className="vh-100 w-100 d-flex justify-content-center align-items-center">
      {/* <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}
      <HashLoader loading color="#36d7b7" />
      <h1>{msg}</h1>
    </div>
  );
}
