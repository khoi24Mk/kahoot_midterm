/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import 'chart.js/auto';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import {
  BsArrowLeft,
  BsArrowRight,
  BsBookmarks,
  BsFillCaretRightFill,
  BsFillPauseCircleFill,
} from 'react-icons/bs';
import screenfull from 'screenfull';
import HostBox from '~/components/BoxComponent/HostBox';
import Constant from '~/constants';
import Heading from './Heading';
import MultipleChoice from './MultipleChoice';
import Paragraph from './Paragraph';

export default function PresentingSlide({
  presentingSlide,
  editingSlide,
  handleEndPresentation,
  handleStartPresentation,
  handlePrevPresentation,
  handleNextPresentation,
  presentationId,
  chats,
  sendChat,
  questions,
  answerQuestion,
}) {
  // manage presentation state
  const [presenting, setPresenting] = useState(false);

  // current slide
  const currentSlide = presenting ? presentingSlide : editingSlide;
  // handle start and end
  const startPresentation = () => {
    setPresenting(true);
    handleStartPresentation();
    screenfull.request(document.getElementById('presentation'));
  };
  const endPresentation = () => {
    setPresenting(false);
    handleEndPresentation();
    screenfull.toggle();
  };

  // link
  const baseURL = window.location.href.replace(window.location.pathname, '');
  const [presentationLink, setPresentationLink] = useState({
    value: `${baseURL}/presentation/${presentationId}/presenting`,
    copied: false,
  });

  return (
    <div id="presentation" className="relative bg-light p-2 rounded-1 h-100">
      <div
        style={{ width: '100%', fontSize: '1.4rem' }}
        className="position-relative d-flex flex-column align-items-center justify-content-center h-100"
      >
        {/* button presenting */}
        {presenting ? (
          <Button
            style={{ position: 'absolute', top: '10px', left: '10px' }}
            variant="secondary"
            onClick={endPresentation}
            size="sm"
          >
            <BsFillPauseCircleFill size={22} /> End Presentation
          </Button>
        ) : (
          <Button
            style={{ position: 'absolute', top: '10px', left: '10px' }}
            variant="primary"
            onClick={startPresentation}
            className="fw-bold"
          >
            <BsFillCaretRightFill size={22} /> Present
          </Button>
        )}

        {/* chat box and question box */}
        <HostBox
          questions={questions}
          chats={chats}
          sendChat={sendChat}
          answerQuestion={answerQuestion}
        />
        {/* end */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <CopyToClipboard text={presentationLink.value}>
            <Button
              onClick={() => {
                setPresentationLink({
                  ...presentationLink,
                  copied: true,
                });
              }}
              size="sm"
              className="p-1"
              variant={presentationLink.copied ? 'secondary' : 'primary'}
            >
              <BsBookmarks /> {presentationLink.copied ? 'Copied' : 'Copy link'}
            </Button>
          </CopyToClipboard>
        </div>

        {/* presenting slide */}
        <h3 className="fw-bold px-5 text-center mb-5">
          {currentSlide?.content}
        </h3>
        {presenting && (
          <>
            <div
              className="p-3 d-flex rounded-circle position-absolute end-0 opacity-50"
              style={{
                height: '50px',
                width: '50px',
                background: 'lightgray',
                cursor: 'pointer',
              }}
              onClick={handleNextPresentation}
            >
              <BsArrowRight />
            </div>
            <div
              className="p-3 d-flex rounded-circle position-absolute start-0 opacity-50"
              style={{
                height: '50px',
                width: '50px',
                background: 'lightgray',
                cursor: 'pointer',
              }}
              onClick={handlePrevPresentation}
            >
              <BsArrowLeft />
            </div>
          </>
        )}
        {/* render type of slide */}
        {!currentSlide?.type ||
          (currentSlide?.type === Constant.SlideType.multipleChoie && (
            <MultipleChoice currentSlide={currentSlide} />
          ))}
        {currentSlide?.type === Constant.SlideType.heading && (
          <Heading currentSlide={currentSlide} />
        )}
        {currentSlide?.type === Constant.SlideType.paragraph && (
          <Paragraph currentSlide={currentSlide} />
        )}
      </div>
    </div>
  );
}
