/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Toast from 'react-bootstrap/Toast';
import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './Notify.module.css';

function Notify({ notify, setShow }) {
  console.log(`msg_${notify.show ? 'on' : 'off'}`);
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
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Bootstrap</strong>
        {/* <small>11 mins ago</small> */}
      </Toast.Header>
      <Toast.Body>{notify.msg}</Toast.Body>
    </Toast>
  );
}

export default Notify;
