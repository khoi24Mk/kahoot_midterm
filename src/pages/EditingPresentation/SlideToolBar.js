import { Dropdown, Spinner } from 'react-bootstrap';
import { BsFillPlusCircleFill } from 'react-icons/bs';

export default function SlideToolBar({
  handleAddDefaultHeadingSlide,
  handleAddDefaultMultipleChoiceSlide,
  handleAddDefaultParagraphSlide,
  saving,
}) {
  return (
    <div className="d-flex justify-content-between p-3 px-5 border-bottom border-2 shadow">
      <div>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <BsFillPlusCircleFill size={22} className="me-1" />
            New Slide
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleAddDefaultMultipleChoiceSlide}>
              Multiple choice
            </Dropdown.Item>
            <Dropdown.Item onClick={handleAddDefaultHeadingSlide}>
              Heading - SubHeading
            </Dropdown.Item>
            <Dropdown.Item onClick={handleAddDefaultParagraphSlide}>
              Paragraph
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        {saving && (
          <span>
            <Spinner
              style={{ width: '1rem', height: '1rem' }}
              animation="border"
            />
            Saving
          </span>
        )}
      </div>
    </div>
  );
}
