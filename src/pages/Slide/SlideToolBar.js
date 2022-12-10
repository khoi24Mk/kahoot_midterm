import { Button, Spinner } from 'react-bootstrap';
import { BsFillCaretRightFill, BsFillPlusCircleFill } from 'react-icons/bs';

export default function SlideToolBar({
  handleAddSlide,
  saving,
  handleStartPresentation,
}) {
  return (
    <div className="d-flex justify-content-between p-3 px-5 border-bottom border-2 shadow">
      <div>
        <Button
          onClick={async () => {
            await handleAddSlide();
          }}
          className="fw-bold"
        >
          <BsFillPlusCircleFill size={22} className="me-1" />
          New Slide
        </Button>
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

        <Button
          variant="primary"
          onClick={handleStartPresentation}
          className="fw-bold"
        >
          <BsFillCaretRightFill size={22} /> Present
        </Button>
      </div>
    </div>
  );
}
