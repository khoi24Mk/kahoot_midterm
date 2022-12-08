/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import clsx from 'clsx';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { FcBarChart, FcDoughnutChart } from 'react-icons/fc';
import { GrFormAdd } from 'react-icons/gr';
import { IoCloseOutline } from 'react-icons/io5';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { RiArrowDropDownLine } from 'react-icons/ri';
import styles from './multiplechoice.module.css';

const CustomDropdown = React.forwardRef(({ children, onClick }, ref) => (
  <button
    type="button"
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

function MultipleChoice({
  setChartName,
  data,
  setData,
  question,
  setQuestion,
  setAnswer,
  setIsNeedUpdate,
}) {
  const handleRemoveOption = (slide) => {
    const items = data.filter((item) => item.id !== slide.id);
    setData(items);
    setIsNeedUpdate();
  };

  const handleAddOption = () => {
    setData([
      ...data,
      {
        id: `${parseInt(data[data.length - 1].id, 10) + 1}`,
        labels: 'Option',
        data: 0,
      },
    ]);
    setIsNeedUpdate();
  };

  const [isShowAnswer, setIsShowAnswer] = useState(false);
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
    setIsNeedUpdate();
  }

  return (
    <div className={clsx(styles.Slide_operator_Content)}>
      <div className={clsx(styles.Slide_operator_question)}>
        {/* <p>Content</p> */}
        <p className="fw-bold">Question</p>
        <Form.Control
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          onBlur={() => setIsNeedUpdate()}
          type="text"
        />
        <div className={clsx(styles.Slide_operator_answer)}>
          <div className={clsx(styles.Slide_operatorAns_header)}>
            <p className="fw-bold">Options</p>
            <Button onClick={() => handleAddOption()}>
              <GrFormAdd color="white" size={20} />
              Add Option
            </Button>
          </div>
          <div className={clsx(styles.Slide_operatorAnswer_item)}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="characters">
                {(draggedItem) => (
                  <ul
                    className="characters"
                    {...draggedItem.droppableProps}
                    ref={draggedItem.innerRef}
                  >
                    <Form>
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
                                  {isShowAnswer ? (
                                    <Form.Check
                                      inline
                                      type="radio"
                                      name="group1"
                                      id={`inline-${index}`}
                                      onChange={(e) => {
                                        e.persist();
                                        setAnswer(item.labels);
                                      }}
                                    />
                                  ) : (
                                    <div />
                                  )}
                                  <Form.Control
                                    value={item.labels}
                                    onChange={(e) => {
                                      const items = [...data];
                                      const slide = {
                                        ...items[index],
                                        labels: e.target.value,
                                      };
                                      items[index] = slide;
                                      setData(items);
                                    }}
                                    onBlur={() => setIsNeedUpdate()}
                                    type="text"
                                  />
                                  <Button
                                    onClick={() => handleRemoveOption(item)}
                                  >
                                    <IoCloseOutline />
                                  </Button>
                                </div>
                              </li>
                            )}
                          </Draggable>
                        );
                      })}
                    </Form>
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
      {/* <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Check this switch"
          onClick={() => setIsShowAnswer(!isShowAnswer)}
        />
      </Form> */}
      <div className={clsx(styles.Slide_operator_layout)}>
        <p className="fw-bold">Result layout</p>
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
                  key={item.name}
                  onClick={() => {
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
                    {item.name}
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
