/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Toast from 'react-bootstrap/Toast';
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Notify.module.css';

function Notify({ notify, setShow }) {
  let type = styles.normal;
  if (notify.type === 'success') {
    type = styles.success;
  } else if (notify.type === 'warning') {
    type = styles.warning;
  }
  return (
    <Toast
      onClose={() => setShow({ show: false })}
      className={clsx(styles.toast, type)}
      show={notify.show}
      delay={3000}
      autohide
    >
      <Toast.Header className="text-black fw-bold">
        <img
          referrerPolicy="no-referrer"
          src="holder.js/20x20?text=%20"
          className="rounded me-2"
          alt=""
        />
        <strong className="me-auto">{notify.type}</strong>
      </Toast.Header>
      <Toast.Body className="text-white">{notify.msg}</Toast.Body>
    </Toast>
  );
}

export default Notify;
