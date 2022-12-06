/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import clsx from 'clsx';
import { Button } from 'react-bootstrap';
import { BsFillPlayFill } from 'react-icons/bs';
import { GoKebabVertical } from 'react-icons/go';
import { FcBarChart, FcSettings } from 'react-icons/fc';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { GrFormAdd } from 'react-icons/gr';
import { CiImport } from 'react-icons/ci';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoCloseOutline } from 'react-icons/io5';
import useWebSocket from 'react-use-websocket';
import styles from './slide.module.css';
import Chart from '~/components/Chart';
import BarChart from '~/components/Chart/barchart';
import Constant from '~/constants';

function Slide() {
  // connect socket
  const { sendJsonMessage } = useWebSocket(
    'wss://kahoot-clone-vodinhphuc.herokuapp.com/socket',
    {
      onOpen: () => console.log('opened'),
      onClose: () => console.log('closed'),
      shouldReconnect: (closeEvent) => true,
    }
  );

  const [chartType, setChartType] = [];

  const finalSpaceCharacters = [
    {
      id: '1',
      name: 'Gary Goodspeed',
      thumb: '/images/gary.png',
    },
    {
      id: '2',
      name: 'sthoco',
      thumb: '/images/gary.png',
    },
    {
      id: '3',
      name: 'hello',
      thumb: '/images/gary.png',
    },
    {
      id: '4',
      name: 'world',
      thumb: '/images/gary.png',
    },
  ];
  //   const layout = [{ id: 1, chart: Barchart }];

  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  function handleOnDragEnd(result) {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <button
      className={clsx(styles.slide_operator_dropButton)}
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <GoKebabVertical />
      {/* <RiArrowDropDownLine size={30} /> */}
    </button>
  ));
  const CustomDropdown = React.forwardRef(({ children, onClick }, ref) => (
    <button
      className={clsx(styles.slide_operator_dropButton)}
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {/* <GoKebabVertical /> */}
      <RiArrowDropDownLine size={30} />
    </button>
  ));

  return (
    <div className={clsx(styles.Presentation_container)}>
      <div className={clsx(styles.Presentation_operator)}>
        <div className={clsx(styles.Presentation_operator_start)}>
          <Button>
            <GrFormAdd color="white" size={20} />
            New Slide
          </Button>
          <Button>
            <CiImport style={{ margin: '5' }} />
            Import
          </Button>
        </div>
        <div className={clsx(styles.Presentation_operator_end)}>
          <Button>
            <FcSettings size={30} />
            Seting
          </Button>
          <Button>
            <HiOutlineDocumentReport size={30} />
            Result
          </Button>
        </div>
      </div>
      <div className={clsx(styles.Slide_workspace)}>
        <div className={clsx(styles.Slide_review)}>
          <div className={clsx(styles.Slide_item, styles.active)}>
            <div className={clsx(styles.Slide_item_operator)}>
              <div>
                <p>1</p>
                <BsFillPlayFill size={20} color="#196cff" />
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} />

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className={clsx(styles.Slide_item_overview)}>
              <FcBarChart size={40} />
              <p>this question is to longggggg</p>
            </div>
          </div>
        </div>
        <div className={clsx(styles.Slide_editor)}>
          <div className={clsx(styles.Slide_editor_item)}>
            <div className={clsx(styles.Slide_editorItem_header)}>
              <p>This is code 113 </p>
            </div>
            <div className={clsx(styles.Slide_editorItem_body)}>
              <p>QUestion</p>
              <Chart
                type="circle"
                labels={[1, 2, 3]}
                datasets={{ data: [10, 20, 20] }}
              />
            </div>
            <div className={clsx(styles.Slide_editorItem_footer)}>
              <FaUserCircle size={25} />
              <p>10</p>
            </div>
          </div>
        </div>
        <div className={clsx(styles.Slide_operator)}>
          <div className={clsx(styles.Slide_operator_type)}>
            <p>Slide type</p>
            <div className={clsx(styles.Slide_operatorType_dropdown)}>
              <p>ok</p>
              <Dropdown>
                <Dropdown.Toggle as={CustomDropdown} />

                <Dropdown.Menu className={clsx(styles.Slide_typeMenu)}>
                  <Dropdown.Item
                    className={clsx(styles.Slide_typeItem)}
                    href="#/action-1"
                  >
                    <p>
                      <FcBarChart size={30} />
                      hello
                    </p>
                  </Dropdown.Item>
                  <Dropdown.Item
                    className={clsx(styles.Slide_typeItem)}
                    href="#/action-1"
                  >
                    <p>
                      <FcBarChart size={30} />
                      hello
                    </p>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className={clsx(styles.Slide_operator_question)}>
            <p>Content</p>
            <p>Question</p>
            <input type="text" />
            <div className={clsx(styles.Slide_operator_answer)}>
              <div className={clsx(styles.Slide_operatorAns_header)}>
                <p>Options</p>
                <Button>
                  <GrFormAdd color="white" size={20} />
                  Add Option
                </Button>
              </div>
              <div className={clsx(styles.Slide_operatorAnswer_item)}>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="characters">
                    {(provided) => (
                      <ul
                        className="characters"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {characters.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  // key={provided.id}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div className={clsx(styles.dragAnswer_item)}>
                                    <MdOutlineDragIndicator />
                                    <input type="text" />
                                    <IoCloseOutline />
                                  </div>
                                </li>
                              )}
                            </Draggable>
                          );
                        })}
                      </ul>
                    )}
                  </Droppable>
                </DragDropContext>
                {/* <button>hello</button> */}
              </div>
            </div>
          </div>
          <div className={clsx(styles.Slide_operator_layout)}>
            <p>Result layout</p>
            <ul>
              {/* {layout.map((item) => (
                <li>{item.id}</li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slide;
