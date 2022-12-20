import 'chart.js/auto';
import clsx from 'clsx';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Stack, Tab, Tabs } from 'react-bootstrap';
import { BsBookmarks } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useWebSocket from 'react-use-websocket';
import deleteCollaboratorOfPresentation from '~/api/normal/presentation/deleteCollaboratorsOfPresentation';
import getChatOfPresentation from '~/api/normal/presentation/getChatOfPresentation';
import getCollaborationLink from '~/api/normal/presentation/getCollaborationLink';
import getCollaboratorsOfPresentation from '~/api/normal/presentation/getCollaboratorsOfPresentation';
import getPresentation from '~/api/normal/presentation/getPresentation';
import getQuestionOfPresentation from '~/api/normal/presentation/getQuestionOfPresentation';
import SlideAction from '~/api/normal/slide/createSlide';
import deleteSlide from '~/api/normal/slide/deleteSlide';
import getSlideOfPresent from '~/api/normal/slide/getSlideOfPresent';
import updateSlide from '~/api/normal/slide/updateSlide';
import Loading from '~/components/Loading';
import People from '~/components/People';
import Constant from '~/constants';
import { AuthContext } from '~/Context';
import socketUtilActions from '~/socketUtils';
import PresentingSlide from '../PresentingSlide';
import Record from '../Record';
import EditingContent from './EditingContent';
import styles from './slide.module.css';
import SlideItem from './SlideItem';
import SlideToolBar from './SlideToolBar';

export default React.memo(function EditingPresentationForCreator() {
  // presentation ID
  const { id: presentationId } = useParams();
  // profile
  const { profile } = useContext(AuthContext);

  // state for presentation
  const [presentation, setPresentation] = useState(null);
  // state for saving
  const [saving, setSaving] = useState(false);
  // state loading
  const [loading, setLoading] = useState(false);
  // state for slides
  const [slides, setSlides] = useState(null);
  // state editting slide
  const [editingSlide, setEditingSlide] = useState(null);
  // state for presenting state
  const [presentingSlide, setPresentingSlide] = useState(null);
  // manage collaboration
  const [collaborators, setCollaborators] = useState(null);
  // manage collaboration invitation
  const [collaborationLink, setCollaborationLink] = useState({
    value: '',
    copied: false,
  });
  // manage chats
  const [chats, setChats] = useState(null);
  // manage questions
  const [questions, setQuestions] = useState(null);
  // manage update state
  const [pingUpdate, setPingUpdate] = useState(false);
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
  const handleStartPresentation = (groupId) => {
    const metaData = {
      roomName: presentation?.roomName,
      clientType: Constant.ClientType.host,
      messageType: Constant.ClientMessageType.start,
    };
    const message = {
      presentationId,
      groupId: groupId > 0 ? groupId : 0,
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

  const navigate = useNavigate();
  // get slide data
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
        // get collaborator
        const resListCollbaoration = await getCollaboratorsOfPresentation(
          presentationId
        );
        setCollaborators(resListCollbaoration?.data?.object);
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
    const asyncCollaborationLink = async () => {
      try {
        // get collaboration link
        const resCollaborationLink = await getCollaborationLink(presentationId);
        setCollaborationLink({
          ...collaborationLink,
          value: resCollaborationLink?.data?.object?.invitationLink,
        });
        return null;
      } catch (err) {
        return null;
      }
    };
    asyncGetData();
    asyncCollaborationLink();
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

    if (editingSlide) {
      const currentEditingSlide = slides?.filter(
        (slide) => slide.id === editingSlide.id
      )[0];
      setEditingSlide({ ...currentEditingSlide });
    }
  }, [slides]);

  // update if need
  const handleFlagUpdate = () => {
    setPingUpdate(!pingUpdate);
  };

  // handle for deleting slide
  const handleDeleteSlide = async (slideId) => {
    setSaving(true);
    try {
      await deleteSlide(presentationId, slideId);
      setSaving(false);

      setSlides(
        slides.filter((item) => {
          return item.id !== slideId;
        })
      );
    } catch (err) {
      toast.error(err?.response?.data?.message);
      if (err?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    } finally {
      setSaving(false);
    }
  };

  // handle when adding slide
  const handleAddDefaultMultipleChoiceSlide = async () => {
    setSaving(true);
    try {
      const response = await SlideAction.createDefaultMultipleChoiceSlide(
        presentationId
      );
      setSaving(false);
      setEditingSlide(response.data.object);
      setSlides([...slides, response.data.object]);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      if (err?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleAddDefaultHeadingSlide = async () => {
    setSaving(true);
    try {
      const response = await SlideAction.createDefaultHeadingSlide(
        presentationId
      );
      setSaving(false);
      setEditingSlide(response.data.object);
      setSlides([...slides, response.data.object]);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      if (err?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleAddDefaultParagraphSlide = async () => {
    setSaving(true);
    try {
      const response = await SlideAction.createDefaultParagraphSlide(
        presentationId
      );
      setSaving(false);
      setEditingSlide(response.data.object);
      setSlides([...slides, response.data.object]);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      if (err?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    } finally {
      setSaving(false);
    }
  };

  // handle upadte slide
  const handleUpdateSlide = async () => {
    setSaving(true);
    try {
      const response = await updateSlide({
        presentationId,
        editedSlide: { ...editingSlide },
      });
      const updatedSlide = response.data.object;
      const updatedList = slides.map((slide) => {
        if (slide.id === updatedSlide.id) return updatedSlide;
        return slide;
      });
      setEditingSlide(updatedSlide);
      setSlides(updatedList);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      if (err?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    } finally {
      setSaving(false);
    }
  };

  // update when needing
  useEffect(() => {
    if (editingSlide) handleUpdateSlide();
  }, [pingUpdate]);

  // handle active slide
  const activeSlide = async (slide) => {
    setEditingSlide(slide);
  };

  // handle delete collaborator
  const handleDeleteCollaborator = async (collaboratorId) => {
    try {
      deleteCollaboratorOfPresentation(collaboratorId, presentationId);
      const newCollaborators = collaborators.filter(
        (c) => c.id !== collaboratorId
      );
      setCollaborators([...newCollaborators]);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      if (err?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    }
  };

  // check creator
  const isCreator = profile?.id === presentation?.owner?.id;

  return (
    <div className={clsx(styles.Presentation_container)}>
      {loading && <Loading />}

      {/* slide toolbar */}
      <SlideToolBar
        handleAddDefaultHeadingSlide={handleAddDefaultHeadingSlide}
        handleAddDefaultMultipleChoiceSlide={
          handleAddDefaultMultipleChoiceSlide
        }
        handleAddDefaultParagraphSlide={handleAddDefaultParagraphSlide}
        saving={saving}
        handleStartPresentation={handleStartPresentation}
      />

      {/* work space */}
      <div className={clsx(styles.Slide_workspace)}>
        {/* left */}
        <div className={clsx(styles.Slide_review)}>
          {slides?.map((slide, index) => (
            <div key={slide.id}>
              <SlideItem
                slide={slide}
                handleActive={() => activeSlide(slide)}
                active={slide.id === (presentingSlide?.id || editingSlide.id)}
                index={index}
                handleDeleteSlide={handleDeleteSlide}
              />
              <hr />
            </div>
          ))}
        </div>
        {/* middle */}
        <div className={clsx(styles.Slide_editor)}>
          <PresentingSlide
            presentationId={presentationId}
            // for slide
            presentingSlide={presentingSlide}
            editingSlide={editingSlide}
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
        </div>
        {/* right */}
        <div className={clsx(styles.Slide_operator)}>
          <Tabs
            defaultActiveKey="content"
            id="uncontrolled-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="content" title="Content">
              <EditingContent
                setEditingSlide={setEditingSlide}
                editingSlide={editingSlide}
                pingUpdate={handleFlagUpdate}
              />
            </Tab>
            <Tab eventKey="collaboration" title="Collaboration">
              {isCreator && (
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(collaborationLink?.value);
                    setCollaborationLink({
                      ...collaborationLink,
                      copied: true,
                    });
                  }}
                  size="sm"
                  className="p-1"
                  variant={collaborationLink.copied ? 'secondary' : 'primary'}
                >
                  <BsBookmarks />
                  {collaborationLink.copied
                    ? 'Copied'
                    : 'Copy collaboration link'}
                </Button>
              )}
              <hr />
              {collaborators?.map((collaborator) => (
                <People
                  key={collaborator.id}
                  img={collaborator.avatar}
                  name={collaborator.displayName}
                  endElement={
                    isCreator && (
                      <Button
                        variant="light"
                        onClick={() =>
                          handleDeleteCollaborator(collaborator?.id)
                        }
                      >
                        <FaTimes />
                      </Button>
                    )
                  }
                />
              ))}
            </Tab>
            <Tab eventKey="result" title="Result">
              <Stack gap={3}>
                {(presentingSlide || editingSlide)?.userRecords?.map(
                  (record) => (
                    <Record key={record?.dateCreated} record={record} />
                  )
                )}
              </Stack>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
});
