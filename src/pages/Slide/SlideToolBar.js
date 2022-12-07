import clsx from 'clsx';
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { CiImport } from 'react-icons/ci';
import { FcSettings } from 'react-icons/fc';
import { GrFormAdd } from 'react-icons/gr';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import styles from './slide.module.css';

export default function SlideToolBar({ handleAddSlide, saving }) {
  return (
    <div className={clsx(styles.Presentation_operator)}>
      <div className={clsx(styles.Presentation_operator_start)}>
        <Button
          onClick={async () => {
            await handleAddSlide();
          }}
        >
          <GrFormAdd color="white" size={20} />
          New Slide
        </Button>
        <Button>
          <CiImport style={{ margin: '5' }} />
          Import
        </Button>
      </div>
      <div
        style={{ fontSize: '1rem' }}
        className={clsx(styles.Presentation_operator_end)}
      >
        {saving ? (
          <span>
            <Spinner
              style={{ width: '1rem', height: '1rem' }}
              animation="border"
            />
            Saving
          </span>
        ) : (
          <div />
        )}
        <Button>
          <FcSettings />
          Seting
        </Button>
        <Button>
          <HiOutlineDocumentReport />
          Result
        </Button>
      </div>
    </div>
  );
}
