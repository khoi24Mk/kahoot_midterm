/* eslint-disable react/button-has-type */
import clsx from 'clsx';
import { Button } from 'react-bootstrap';
import { FaFacebookSquare } from 'react-icons/fa';
import { ImGoogle2 } from 'react-icons/im';
import { AiOutlineCopyrightCircle } from 'react-icons/ai';
import { Link, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import styles from './Home.module.css';
import { AuthContext } from '~/Context';

function Home() {
  const context = useContext(AuthContext);
  const { profile } = context;
  const unAuthenticated = profile === null || profile === undefined;

  return unAuthenticated ? (
    <div>
      <div className={clsx(styles.intro)}>
        <h1 className="text-uppercase fw-bold">Experience my service </h1>
        <div className={clsx(styles.register)} />
        <Button as={Link} to="/register" className={clsx(styles.logup)}>
          Register
        </Button>
      </div>
      <div className={styles.footer}>
        <div className={styles.info}>
          <p>
            <AiOutlineCopyrightCircle size={20} />
            2022 Kahoot
          </p>
          <a href="https://copper-freezer-547.notion.site/Web-7e9342a8b65446e4ad86f16fea46cb8d">
            Notion
          </a>
          <a href="https://copper-freezer-547.notion.site/Web-7e9342a8b65446e4ad86f16fea46cb8d">
            Report
          </a>
        </div>
        <div className={styles.social}>
          <FaFacebookSquare />
          <ImGoogle2 />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/group" />
  );
}

export default Home;
