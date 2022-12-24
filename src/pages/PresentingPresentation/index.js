import { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
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

  const navigate = useNavigate();
  const asyncGetPresentation = async () => {
    const presentationRes = await getPresentation(presentationId);
    setPresentation(presentationRes.data.object);
  };
  const asyncGetPresentingSlide = async () => {
    try {
      setLoading(true);
      const slideResponse = await getPresentingSlide(presentationId);
      setSlide(slideResponse.data.object);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      if (error?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
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
      asyncGetPresentingSlide();
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
  const upvoteQuestion = (questionId) => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.member,
      messageType: Constant.ClientMessageType.toggleVotingQuestion,
    };
    const message = {
      questionId,
      userId: profile?.id,
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
    asyncGetPresentation();
    asyncGetPresentingSlide();
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
        presentationId={presentationId}
        upvoteQuestion={upvoteQuestion}
        askQuestion={askQuestion}
        chats={chats}
        setChats={setChats}
        questions={questions}
        sendChat={sendChat}
      />

      {slide?.userRecords?.length === 0}
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
      title="Presentation Error"
      error="This presentation hasn't been started yet."
    />
  );
}

export default PresentingPresentation;
