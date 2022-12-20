import 'chart.js/auto';
import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Row, Stack } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useWebSocket from 'react-use-websocket';
import getChatOfPresentation from '~/api/normal/presentation/getChatOfPresentation';
import getPresentation from '~/api/normal/presentation/getPresentation';
import getQuestionOfPresentation from '~/api/normal/presentation/getQuestionOfPresentation';
import getSlideOfPresent from '~/api/normal/slide/getSlideOfPresent';
import Loading from '~/components/Loading';
import Constant from '~/constants';
import { AuthContext } from '~/Context';
import socketUtilActions from '~/socketUtils';
import SlideItem from '../EditingPresentationForCreator/SlideItem';
import PresentingSlide from '../PresentingSlide';
import Record from '../Record';

export default React.memo(function EditingPresentationForSupporter() {
  // presentation ID
  const { id: presentationId } = useParams();
  // profile
  const { profile } = useContext(AuthContext);
  // state for presentation
  const [presentation, setPresentation] = useState(null);
  // state loading
  const [loading, setLoading] = useState(false);
  // state for slides
  const [slides, setSlides] = useState(null);
  // state for presenting state
  const [presentingSlide, setPresentingSlide] = useState(null);
  // manage chats
  const [chats, setChats] = useState(null);
  // manage questions
  const [questions, setQuestions] = useState(null);
  // state editting slide
  const [editingSlide, setEditingSlide] = useState(null);
  // handle socket message
  const handleReceivedMessage = (event) => {
    const receivedEvent = JSON.parse(event);
    if (
      receivedEvent.metaData.messageType ===
      Constant.ServerMessageType.presentedSlide
    ) {
      const receivedSlides = receivedEvent.message;
      // update list slide
      setSlides([...receivedSlides]);
    }
    if (
      receivedEvent.metaData.messageType ===
      Constant.ServerMessageType.updatedSlide
    ) {
      const receivedSlide = receivedEvent.message;
      // update list slide
      const updatedSlides = slides?.map((slide) => {
        if (receivedSlide.id === slide.id) return receivedSlide;
        return slide;
      });
      setSlides([...updatedSlides]);
    }
    // update chats
    if (
      receivedEvent.metaData.messageType === Constant.ServerMessageType.chat
    ) {
      setChats([...chats, receivedEvent.message]);
    }
    // update answered question
    if (
      receivedEvent.metaData.messageType ===
        Constant.ServerMessageType.answeredQuestion ||
      receivedEvent.metaData.messageType ===
        Constant.ServerMessageType.votedQuestion
    ) {
      const updatedQuestion = receivedEvent.message;
      setQuestions([
        ...questions.map((question) => {
          if (question?.id === updatedQuestion?.id) {
            return updatedQuestion;
          }
          return question;
        }),
      ]);
    }
    // update ask question
    if (
      receivedEvent.metaData.messageType ===
      Constant.ServerMessageType.askedQuestion
    ) {
      setQuestions([...questions, receivedEvent.message]);
    }
  };

  // connect socket
  const { sendMessage } = useWebSocket(Constant.SocketURL, {
    onMessage: (message) => handleReceivedMessage(message?.data),
    share: true,
  });

  // handle start presentation
  const handleStartPresentation = (groupIds) => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.host,
      messageType: Constant.ClientMessageType.start,
    };
    const message = {
      presentationId,
      groupIds,
    };
    sendMessage(socketUtilActions.getRawSocketMessage({ metaData, message }));
  };
  // handle end presentation
  const handleEndPresentation = () => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.host,
      messageType: Constant.ClientMessageType.end,
    };
    const message = {
      presentationId,
    };
    sendMessage(socketUtilActions.getRawSocketMessage({ metaData, message }));
  };
  // handle next slide presentation
  const handleNextPresentation = () => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.host,
      messageType: Constant.ClientMessageType.nextSlide,
    };
    const message = {
      presentationId,
    };
    sendMessage(socketUtilActions.getRawSocketMessage({ metaData, message }));
  };
  // handle next slide presentation
  const handlePrevPresentation = () => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.host,
      messageType: Constant.ClientMessageType.prevSlide,
    };
    const message = {
      presentationId,
    };
    sendMessage(socketUtilActions.getRawSocketMessage({ metaData, message }));
  };

  // handle chat
  const sendChat = (content) => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.host,
      messageType: Constant.ClientMessageType.chat,
    };
    const message = {
      presentationId,
      userId: profile?.id,
      content,
    };
    sendMessage(socketUtilActions.getRawSocketMessage({ metaData, message }));
  };

  // handle answer question
  const answerQuestion = (questionId) => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.host,
      messageType: Constant.ClientMessageType.answerQuestion,
    };
    const message = {
      questionId,
    };
    sendMessage(socketUtilActions.getRawSocketMessage({ metaData, message }));
  };

  // handle answer question
  const upvoteQuestion = (questionId) => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.host,
      messageType: Constant.ClientMessageType.toggleVotingQuestion,
    };
    const message = {
      questionId,
      userId: profile?.id,
    };
    sendMessage(socketUtilActions.getRawSocketMessage({ metaData, message }));
  };

  // join room with ws
  useEffect(() => {
    if (presentation == null) return;
    sendMessage(
      JSON.stringify({
        metaData: {
          roomName: presentation.roomName,
          clientType: Constant.ClientType.host,
          messageType: Constant.ClientMessageType.joinRoom,
        },
        message: null,
      })
    );
    // eslint-disable-next-line consistent-return
    return () =>
      sendMessage(
        JSON.stringify({
          metaData: {
            roomName: presentation.roomName,
            clientType: Constant.ClientType.host,
            messageType: Constant.ClientMessageType.leaveRoom,
          },
        })
      );
  }, [presentation]);

  // get slide data
  const navigate = useNavigate();
  useEffect(() => {
    const asyncGetData = async () => {
      try {
        setLoading(true);
        // get presentation
        const presentationRes = await getPresentation(presentationId);
        setPresentation(presentationRes.data.object);
        // get slide
        const resListSlide = await getSlideOfPresent(presentationId);
        setSlides(resListSlide?.data?.object);
        setEditingSlide(resListSlide?.data?.object[0]);
        // get chats
        const chatsRes = await getChatOfPresentation(presentationId);
        setChats(chatsRes?.data?.object);
        // get questions
        const questionsRes = await getQuestionOfPresentation(presentationId);
        setQuestions(questionsRes?.data?.object);
      } catch (err) {
        toast.error(err?.response?.data?.message);
        if (err?.response?.status === 403) {
          navigate({ pathname: '/notPermission' });
        }
      } finally {
        setLoading(false);
      }
    };

    asyncGetData();
  }, []);

  // get presenting slide
  useEffect(() => {
    const currentPresentingSlides = slides?.filter(
      (slide) => slide.presenting === true
    );
    if (currentPresentingSlides?.length > 0) {
      setPresentingSlide({ ...currentPresentingSlides[0] });
    } else {
      setPresentingSlide(undefined);
    }
  }, [slides]);

  // handle active slide
  const activeSlide = async (slide) => {
    setEditingSlide(slide);
  };

  return (
    <div className="h-100" style={{ fontSize: '1rem' }}>
      {loading && <Loading />}

      {/* work space */}

      <Row className="h-100 border-top">
        {/* left */}
        <Col className="h-100" xs={2}>
          {slides?.map((slide) => (
            <div key={slide.id}>
              <SlideItem
                slide={slide}
                handleActive={() => activeSlide(slide)}
                active={slide.id === (presentingSlide?.id || editingSlide.id)}
              />
              <hr />
            </div>
          ))}
        </Col>
        {/* Center */}
        <Col className="h-100 px-5 py-2 bg-light" xs={7}>
          <PresentingSlide
            editingSlide={editingSlide}
            presentationId={presentationId}
            // for slide
            presentingSlide={presentingSlide}
            // for handle presentation
            handleEndPresentation={handleEndPresentation}
            handleStartPresentation={handleStartPresentation}
            handleNextPresentation={handleNextPresentation}
            handlePrevPresentation={handlePrevPresentation}
            // for chat box
            chats={chats}
            sendChat={sendChat}
            // for question
            questions={questions}
            answerQuestion={answerQuestion}
            upvoteQuestion={upvoteQuestion}
            // next and prev
            slides={slides}
          />
        </Col>
        <Col style={{ overflowY: 'scroll' }} className="h-100 mt-3" xs={3}>
          <Card className="fw-bold text-uppercase text-center bg-light">
            <Card.Body>{presentation?.presentationName}</Card.Body>
          </Card>
          <hr />
          <Stack gap={3}>
            {(presentingSlide || editingSlide)?.userRecords?.map((record) => (
              <Record key={record?.dateCreated} record={record} />
            ))}
          </Stack>
        </Col>
      </Row>
    </div>
  );
});
