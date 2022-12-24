/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import {
  BsArrowLeft,
  BsArrowRight,
  BsBookmarks,
  BsFillCaretRightFill,
  BsFillPauseCircleFill,
} from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import screenfull from 'screenfull';
import getGroupList from '~/api/normal/group/getGroupList';
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
  setChats,
  chats,
  sendChat,
  questions,
  answerQuestion,
  upvoteQuestion,
  slides,
}) {
  // manage modal for presenting
  const [showPresentingModal, setShowPresentingModal] = useState(false);
  // manage presented group ids
  const [groupId, setGroupId] = useState([]);
  // manage group
  const [groups, setGroups] = useState([]);
  // manage screen state
  const [isFullScreen, setIsFullScreen] = useState(false);

  // current slide
  const currentSlide = presentingSlide || editingSlide;

  // handle join presenting presentation
  const handleJoinPresentingPresentation = () => {
    setIsFullScreen(true);
    const element = document.getElementById('presentation');
    screenfull.request(element);
  };
  const handleExitPresentingPresentation = () => {
    setIsFullScreen(false);
    screenfull.exit();
  };
  // handle start and end
  const startPresentation = () => {
    handleStartPresentation(groupId);
    handleJoinPresentingPresentation();
    setShowPresentingModal(false);
  };
  const endPresentation = () => {
    handleEndPresentation();
  };

  // handle show presenting modal
  const handleClosePresentingModal = () => {
    setShowPresentingModal(false);
    setGroupId(0);
  };
  const handleShowPresentingModal = () => setShowPresentingModal(true);

  // link
  const baseURL = window.location.href.replace(window.location.pathname, '');
  const [presentationLink, setPresentationLink] = useState({
    copied: false,
    value: `${baseURL}/presentation/${presentationId}/presenting`,
  });

  const navigate = useNavigate();
  // get groups
  useEffect(() => {
    const asyncGetMyGroup = async () => {
      try {
        const groupRes = await getGroupList();
        setGroups([...groupRes?.data?.object]);
      } catch (err) {
        if (err?.response?.status === 403) {
          navigate({ pathname: '/notPermission' });
        }
        toast.error(err?.response?.data?.message);
      }
    };
    asyncGetMyGroup();
  }, []);

  // start presenting if having presenting slide and nguoc lai
  useEffect(() => {
    if (!presentingSlide) {
      handleExitPresentingPresentation();
    }
  }, [presentingSlide]);

  return (
    <div id="presentation" className="relative bg-white p-2 rounded-1 h-100">
      <div
        style={{ width: '100%', fontSize: '1.4rem' }}
        className="position-relative d-flex flex-column align-items-center justify-content-center h-100"
      >
        {/* button presenting */}
        {presentingSlide ? (
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
            onClick={handleShowPresentingModal}
            className="fw-bold"
          >
            <BsFillCaretRightFill size={22} /> Present
          </Button>
        )}

        {/* chat box and question box */}
        <HostBox
          presentationId={presentationId}
          setChats={setChats}
          questions={questions}
          chats={chats}
          sendChat={sendChat}
          answerQuestion={answerQuestion}
          upvoteQuestion={upvoteQuestion}
        />
        {/* end */}
        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(presentationLink?.value);
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
          {presentingSlide &&
            (isFullScreen ? (
              <Button
                className="ms-2"
                size="sm"
                variant="secondary"
                onClick={() => handleExitPresentingPresentation()}
              >
                Exit fullscreen
              </Button>
            ) : (
              <Button
                className="ms-2"
                size="sm"
                variant="secondary"
                onClick={() => handleJoinPresentingPresentation()}
              >
                Fullscreen
              </Button>
            ))}
        </div>

        {/* presenting slide */}
        <h3 className="fw-bold px-5 text-center mb-5">
          {currentSlide?.content}
        </h3>
        {presentingSlide && (
          <>
            {slides[slides.length - 1].id > presentingSlide.id && (
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
            )}
            {slides[0].id < presentingSlide.id && (
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
            )}
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
      <Modal
        style={{ fontSize: '1rem' }}
        show={showPresentingModal}
        onHide={handleClosePresentingModal}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center fw-bold">
            Choose groups for presentation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <Row sm="1" md="2">
              {groups?.map((group) => (
                <Col key={group.id}>
                  <Form.Check
                    checked={groupId === group.id}
                    onChange={() => {
                      setGroupId(group.id);
                    }}
                    type="radio"
                    id={group?.id}
                    label={group?.groupName}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePresentingModal}>
            Close
          </Button>
          <Button variant="primary" onClick={startPresentation}>
            Present
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
