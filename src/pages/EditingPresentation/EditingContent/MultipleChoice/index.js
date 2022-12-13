/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-bind */
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Button, Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { FcBarChart, FcDoughnutChart } from 'react-icons/fc';
import { IoCloseOutline } from 'react-icons/io5';
import { MdOutlineDragIndicator } from 'react-icons/md';

const chartOptions = [
  {
    icon: FcBarChart,
    label: 'Bar Chart',
    value: 'bar',
  },
  {
    icon: FcDoughnutChart,
    label: 'Doughnut Chart',
    value: 'doughnut',
  },
];

function MultipleChoice({ editingSlide, setEditingSlide, pingUpdate }) {
  const handleRemoveOption = (index) => {
    const newOptions = editingSlide?.options?.filter((item, i) => i !== index);
    setEditingSlide({
      ...editingSlide,
      options: [...newOptions],
    });
    pingUpdate();
  };

  const handleAddOption = () => {
    const newOptions = [...editingSlide?.options, 'Option'];
    setEditingSlide({
      ...editingSlide,
      options: [...newOptions],
    });
    pingUpdate();
  };

  function handleOnDragEnd(result) {
    const newOptions = [...editingSlide?.options];
    // const items = Array.from(characters);
    const [reorderedItem] = newOptions.splice(result.source.index, 1);
    newOptions.splice(result.destination.index, 0, reorderedItem);
    // updateCharacters(items);
    setEditingSlide({
      ...editingSlide,
      options: [...newOptions],
    });
    pingUpdate();
  }

  return (
    <Stack gap={4}>
      <div>
        <p className="fw-bold">Question</p>
        <Form.Control
          value={editingSlide?.content}
          onChange={(e) => {
            setEditingSlide({
              ...editingSlide,
              content: e.target.value,
            });
          }}
          onBlur={() => pingUpdate()}
          type="text"
        />
      </div>

      <div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="fw-bold">Options</p>
          <Button onClick={() => handleAddOption()}>Add Option</Button>
        </div>
        <div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(draggedItem) => (
                <ul
                  className="characters list-unstyled mt-3"
                  {...draggedItem.droppableProps}
                  ref={draggedItem.innerRef}
                >
                  <Form>
                    {editingSlide?.options?.map((option, index) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={option}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="d-flex justify-content-around align-items-center mb-2">
                                <MdOutlineDragIndicator />
                                <Form.Control
                                  value={option}
                                  onChange={(e) => {
                                    const newOptions = editingSlide.options.map(
                                      (item, i) => {
                                        if (i === index) return e.target.value;
                                        return item;
                                      }
                                    );
                                    setEditingSlide({
                                      ...editingSlide,
                                      options: [...newOptions],
                                    });
                                  }}
                                  onBlur={() => pingUpdate()}
                                  type="text"
                                />
                                <Button
                                  className="ms-1"
                                  onClick={() => handleRemoveOption(index)}
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
      <div>
        <p className="fw-bold">Result layout</p>
        <Form.Select aria-label="Default select example">
          {chartOptions.map((chart) => (
            <option key={chart.value} value={chart.value}>
              {chart.label}
            </option>
          ))}
        </Form.Select>
      </div>
    </Stack>
  );
}

export default MultipleChoice;
