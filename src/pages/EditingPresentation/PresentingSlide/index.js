import 'chart.js/auto';
import { useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';
import screenfull from 'screenfull';
import {
  BsBookmarks,
  BsChatFill,
  BsFillCaretRightFill,
  BsFillPauseCircleFill,
  BsQuestionCircleFill,
} from 'react-icons/bs';
import Constant from '~/constants';
import ChatBox from './ChatBox';
import Heading from './Heading';
import MultipleChoice from './MultipleChoice';
import Paragraph from './Paragraph';
import QuestionBox from './QuestionBox';

export default function PresentingSlide({
  editingSlide,
  handleEndPresentation,
  handleStartPresentation,
  presentationId,
}) {
  // manage presentation state
  const [presenting, setPresenting] = useState(false);
  // manage chat
  const [showChat, setShowChat] = useState(false);
  // manage question
  const [showQuestion, setShowQuestion] = useState(false);
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

  // handle show chat and question
  const toggleShowChat = () => {
    setShowChat(!showChat);
  };
  const toggleShowQuestion = () => {
    setShowQuestion(!showQuestion);
  };
  // link
  const baseURL = window.location.href.replace(window.location.pathname, '');
  const [presentationLink, setPresentationLink] = useState({
    value: `${baseURL}/presentation/${presentationId}`,
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

        {/* button show chat */}
        <Stack
          style={{ position: 'absolute', bottom: '10px', right: '10px' }}
          variant="secondary"
          onClick={handleEndPresentation}
          size="sm"
          direction="horizontal"
          gap={3}
        >
          <Button variant="secondary" onClick={toggleShowChat}>
            <BsChatFill size={30} />
          </Button>
          <Button variant="secondary" onClick={toggleShowQuestion}>
            <BsQuestionCircleFill size={30} />
          </Button>
        </Stack>
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
        {/* chat box */}
        <ChatBox show={showChat} toggleShow={toggleShowChat} />
        {/* chat box */}
        <QuestionBox
          show={showQuestion}
          toggleShow={toggleShowQuestion}
          questions={[
            { content: 'How are you ?', username: 'Vo dinh phuc' },
            { content: 'How old are you ?', username: 'Nguyen Khoi' },
          ]}
        />

        {/* presenting slide */}
        <h3 className="fw-bold px-5 text-center mb-5">
          {editingSlide?.content}
        </h3>
        {/* render type of slide */}
        {!editingSlide?.type ||
          (editingSlide?.type === Constant.SlideType.multipleChoie && (
            <MultipleChoice editingSlide={editingSlide} />
          ))}
        {editingSlide?.type === Constant.SlideType.heading && (
          <Heading editingSlide={editingSlide} />
        )}
        {editingSlide?.type === Constant.SlideType.paragraph && (
          <Paragraph editingSlide={editingSlide} />
        )}
      </div>
    </div>
  );
}
