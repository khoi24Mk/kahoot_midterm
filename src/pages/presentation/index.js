import { useContext, useEffect, useState } from 'react';
import { Button, Container, Spinner, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import getPresentation from '~/api/normal/presentation/getPresentation';
import getPresentingSlide from '~/api/normal/slide/getPrentingSlide';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import Constant from '~/constants';
import { AuthContext } from '~/Context';
import Option from './Option';

function Presentation() {
  // user id
  const { profile } = useContext(AuthContext);
  // get presentation id
  const { id: presentationId } = useParams();
  // state for answer
  const [checkedIndex, setCheckedIndex] = useState(-1);

  // state for presentation
  const [presentation, setPresentation] = useState(null);

  // state for slide
  const [slide, setSlide] = useState(null);
  const [loading, setLoading] = useState(false);

  // submitting
  const [submiting, setSubmitting] = useState(false);

  // handle socket message
  const handleReceivedMessage = (event) => {
    const receivedEvent = JSON.parse(event);
    console.log(receivedEvent);
    if (
      receivedEvent.metaData.messageType ===
        Constant.ServerMessageType.updatedSlide ||
      receivedEvent.metaData.messageType ===
        Constant.ServerMessageType.presentedSlide
    ) {
      const receivedSlide = receivedEvent.message;
      setSlide(receivedSlide);
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

  // handle vote
  const handleVote = () => {
    setSubmitting(true);
    const message = {
      metaData: {
        roomName: presentation.roomName,
        clientType: Constant.ClientType.member,
        messageType: Constant.ClientMessageType.voteSlide,
      },
      message: {
        userId: profile.id,
        slideId: slide.id,
        answer: slide.options[checkedIndex],
      },
    };

    console.log(message);

    sendMessage(JSON.stringify(message));
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

  useEffect(() => {
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

    asyncGetPresentingSlide(presentationId);
  }, []);

  if (loading) return <Loading />;
  return slide ? (
    <Container style={{ maxWidth: '568px' }} className="py-4">
      <h2 className="mb-5 text-center fw-bold">KAMEN system</h2>

      <p className="fw-bold">{slide?.content}</p>

      <Stack gap={3}>
        {slide?.options.map((option, index) => {
          return (
            <Option
              checked={index === checkedIndex}
              handleCheck={() => {
                setCheckedIndex(index);
              }}
              option={option}
              id={index + 1}
              key={option}
            />
          );
        })}

        <Button size="lg" onClick={handleVote} disabled={submiting}>
          {submiting && <Spinner size="sm" />}
          Submit
        </Button>
      </Stack>
    </Container>
  ) : (
    <Error
      title="Existing Voting"
      error="You voted presenting slide. Plase, wait for host present another slide"
    />
  );
}

export default Presentation;
