/* eslint-disable no-unused-vars */
import React from 'react';
// import { Spinner } from 'react-bootstrap';
import HashLoader from 'react-spinners/HashLoader';
import clsx from 'clsx';
import styles from './loading.module.css';

export default function Loading({ msg }) {
  return (
    <div className={clsx(styles.loading)}>
      {/* <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner> */}
      <HashLoader loading color="#36d7b7" />
      <h1>{msg}</h1>
    </div>
  );
}
