/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import clsx from 'clsx';
import { BsFillPlayFill } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import { FcBarChart } from 'react-icons/fc';
import { GoKebabVertical } from 'react-icons/go';
import styles from './slide.module.css';

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <button
    type="button"
    className={clsx(styles.slide_operator_dropButton)}
    href=""
    ref={ref}
    onClick={(e) => {
      e.stopPropagation();
      onClick(e);
    }}
  >
    {children}
    <GoKebabVertical />
  </button>
));

export default function SlideItem({
  index,
  slide,
  handleActive,
  active,
  handleDeleteSlide,
}) {
  return (
    <div
      onClick={handleActive}
      className={clsx(styles.Slide_item, {
        [styles.active]: active,
      })}
    >
      <div className={clsx(styles.Slide_item_operator)}>
        <div>
          <p>{index}</p>
          <BsFillPlayFill size={20} color="#196cff" />
        </div>
        <div>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={async () => {
                  await handleDeleteSlide(slide.id);
                }}
              >
                Delete
              </Dropdown.Item>
              <Dropdown.Item>Active</Dropdown.Item>
              <Dropdown.Item>Double</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className={clsx(styles.Slide_item_overview)}>
        <FcBarChart size={40} />
        <p
          style={{
            width: '150px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
          }}
        >
          {slide.content}
        </p>
      </div>
    </div>
  );
}
