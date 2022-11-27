/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import styles from './Home.module.css';

function Home() {
  return (
    <div>
      <div className={clsx(styles.intro)}>
        <h1>Build amazing things</h1>
        <p>sth</p>
        <div className={clsx(styles.register)} />
        <button className={clsx(styles.logup)}>Register</button>
      </div>
      <div className={styles.footer}>
        <h1>Footer</h1>
      </div>
    </div>
  );
}

export default Home;
