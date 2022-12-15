import { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import getChatOfPresentation from '~/api/normal/presentation/getChatOfPresentation';
import getPresentation from '~/api/normal/presentation/getPresentation';
import getQuestionOfPresentation from '~/api/normal/presentation/getQuestionOfPresentation';
import getPresentingSlide from '~/api/normal/slide/getPrentingSlide';
import ParticipantBox from '~/components/BoxComponent/ParticipantBox';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import Constant from '~/constants';
import { AuthContext } from '~/Context';
import socketUtilActions from '~/socketUtils';
import Heading from './Heading';
import MultipleChoice from './MultipleChoice';
import Paragraph from './Paragraph';

function PresentingPresentation() {
  // user id
  const { profile } = useContext(AuthContext);
  // get presentation id
  const { id: presentationId } = useParams();

  // state for presentation
  const [presentation, setPresentation] = useState(null);

  // manage chat
  const [chats, setChats] = useState(null);

  // manage question
  const [questions, setQuestions] = useState(null);
  // state for slide
  const [slide, setSlide] = useState(null);
  const [loading, setLoading] = useState(true);

  const asyncGetPresentingSlide = async (pId) => {
    try {
      setLoading(true);
      const slideResponse = await getPresentingSlide(pId);
      const presentationRes = await getPresentation(presentationId);
      setSlide(slideResponse.data.object);
      setPresentation(presentationRes.data.object);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setSlide(null);
    } finally {
      setLoading(false);
    }
  };
  // handle socket message
  const handleReceivedMessage = (event) => {
    const receivedEvent = JSON.parse(event);
    // slide
    if (
      receivedEvent.metaData.messageType ===
        Constant.ServerMessageType.updatedSlide ||
      receivedEvent.metaData.messageType ===
        Constant.ServerMessageType.presentedSlide
    ) {
      asyncGetPresentingSlide(presentationId);
      setLoading(false);
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
      Constant.ServerMessageType.answeredQuestion
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
    onOpen: () => {
      console.log('Open socket');
    },
    onClose: () => {
      console.log('Close socket');
    },
    onError: () => {
      console.log('Error socket');
    },
    shouldReconnect: () => true,
    onMessage: (message) => handleReceivedMessage(message?.data),
  });

  // handle chat
  const sendChat = (content) => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.clientType,
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
  const askQuestion = (content) => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.clientType,
      messageType: Constant.ClientMessageType.askQuestion,
    };
    const message = {
      userId: profile?.id,
      presentationId,
      content,
    };
    sendMessage(socketUtilActions.getRawSocketMessage({ metaData, message }));
  };

  useEffect(() => {
    if (presentation == null) return;
    sendMessage(
      JSON.stringify({
        metaData: {
          roomName: presentation.roomName,
          clientType: Constant.ClientType.member,
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
            clientType: Constant.ClientType.member,
            messageType: Constant.ClientMessageType.leaveRoom,
          },
        })
      );
  }, [presentation]);

  // get presenting data
  useEffect(() => {
    asyncGetPresentingSlide(presentationId);
  }, []);

  // get chat and question data
  useEffect(() => {
    const asyncGetData = async () => {
      // get chats
      const chatsRes = await getChatOfPresentation(presentationId);
      setChats(chatsRes?.data?.object);
      // get questions
      const questionsRes = await getQuestionOfPresentation(presentationId);
      setQuestions(questionsRes?.data?.object);
    };
    asyncGetData();
  }, []);

  if (loading) return <Loading />;
  return slide ? (
    <Container fluid className="position-relative h-100">
      {/* chat box and question box */}
      <ParticipantBox
        askQuestion={askQuestion}
        chats={chats}
        questions={questions}
        sendChat={sendChat}
      />
      <Container style={{ maxWidth: '568px' }} className="py-4 h-100">
        <h2 className="mb-5 text-center fw-bold">KAMEN system</h2>

        <p className="fw-bold text-center">{slide?.content}</p>

        {!slide?.type ||
          (slide?.type === Constant.SlideType.multipleChoie && (
            <MultipleChoice
              presentation={presentation}
              profile={profile}
              sendMessage={sendMessage}
              slide={slide}
            />
          ))}
        {slide?.type === Constant.SlideType.heading && (
          <Heading slide={slide} />
        )}
        {slide?.type === Constant.SlideType.paragraph && (
          <Paragraph slide={slide} />
        )}
      </Container>
    </Container>
  ) : (
    <Error
      title="Existing Voting"
      error="You voted presenting slide. Plase, wait for host present another slide"
    />
  );
}

export default PresentingPresentation;
