/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-no-bind */
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { GrFormAdd } from 'react-icons/gr';
import { IoCloseOutline } from 'react-icons/io5';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { FcBarChart, FcSettings, FcDoughnutChart } from 'react-icons/fc';
import { RiArrowDropDownLine } from 'react-icons/ri';
import Form from 'react-bootstrap/Form';
import styles from './multiplechoice.module.css';

function MultipleChoice({ setChartName, data, setData, setQuestion }) {
  const handleAddOption = () => {
    setData([
      ...data,
      {
        id: `${parseInt(data[data.length - 1].id, 10) + 1}`,
        labels: `${parseInt(data[data.length - 1].id, 10) + 1}`,
        data: 543,
      },
    ]);
  };

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

  const chartOptions = [
    {
      icon: FcBarChart,
      name: 'bar',
    },
    {
      icon: FcDoughnutChart,
      name: 'circle',
    },
  ];

  const [chartType, setChartType] = useState({
    icon: FcBarChart,
    name: 'bar',
  });

  function handleOnDragEnd(result) {
    const items = Array.from(data);
    // const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // updateCharacters(items);
    setData(items);
  }

  return (
    <div className={clsx(styles.Slide_operator_Content)}>
      <div className={clsx(styles.Slide_operator_question)}>
        <p>Content</p>
        <p>Question</p>
        <input onChange={(e) => setQuestion(e.target.value)} type="text" />
        <div className={clsx(styles.Slide_operator_answer)}>
          <div className={clsx(styles.Slide_operatorAns_header)}>
            <p>Options</p>
            <Button onClick={() => handleAddOption()}>
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
                    {data.map((item, index) => {
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
                                <input
                                  value={item.labels}
                                  onChange={(e) => {
                                    const items = [...data];
                                    const item = {
                                      ...items[index],
                                      labels: e.target.value,
                                    };
                                    items[index] = item;
                                    console.log('ONCHANGE');
                                    console.log(items);
                                    setData(items);
                                  }}
                                  type="text"
                                />
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
        <div className={clsx(styles.Slide_operatorLayout_dropdown)}>
          <p>
            <span>
              <chartType.icon size={30} />
            </span>
            {chartType.name}
          </p>
          <Dropdown>
            <Dropdown.Toggle as={CustomDropdown} />

            <Dropdown.Menu className={clsx(styles.Slide_LayoutMenu)}>
              {chartOptions.map((item) => (
                <Dropdown.Item
                  onClick={() => {
                    console.log('Click');
                    setChartType(item);
                    setChartName(item.name);
                    // setData([44, 24, 39, 94]);
                    // setLabels([1, 2, 3, 4]);
                  }}
                  className={clsx(styles.Slide_LayoutItem)}
                  href="#/action-1"
                >
                  <p>
                    <item.icon size={30} />
                    hello
                  </p>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default MultipleChoice;
