import { Stack } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function Paragraph({ editingSlide, setEditingSlide, pingUpdate }) {
  return (
    <Stack gap={4}>
      <div>
        <h5 className="fw-bold mb-3">Title</h5>
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
        <h5 className="fw-bold mb-3">Paragraph</h5>
        {editingSlide?.options?.map((option, index) => {
          return (
            <div className="d-flex justify-content-around align-items-center mb-2">
              <Form.Control
                as="textarea"
                rows={4}
                value={option}
                onChange={(e) => {
                  const newOptions = editingSlide.options.map((item, i) => {
                    if (i === index) return e.target.value;
                    return item;
                  });
                  setEditingSlide({
                    ...editingSlide,
                    options: [...newOptions],
                  });
                }}
                onBlur={() => pingUpdate()}
              />
            </div>
          );
        })}
      </div>
    </Stack>
  );
}

export default Paragraph;
