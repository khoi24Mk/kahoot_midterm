import React, { useEffect, useState } from 'react';
import ChatBox from '../ChatBox';
import ToolBar from '../ToolBar';
import QuestionBox from './QuestionBox';

export default function HostBox({
  setChats,
  chats,
  questions,
  sendChat,
  answerQuestion,
  upvoteQuestion,
  presentationId,
}) {
  // manage new chat
  const [newChat, setNewChat] = useState(false);
  // manage chat
  const [showChat, setShowChat] = useState(false);
  // manage question
  const [showQuestion, setShowQuestion] = useState(false);
  // update new chat status
  useEffect(() => {
    setNewChat(!showChat && true);
  }, [chats]);
  // handle show chat and question
  const toggleShowChat = () => {
    setShowChat(!showChat);
    setNewChat(false);
  };
  const toggleShowQuestion = () => {
    setShowQuestion(!showQuestion);
  };
  return (
    <>
      <ToolBar
        newChat={newChat}
        toggleShowChat={toggleShowChat}
        toggleShowQuestion={toggleShowQuestion}
      />
      <ChatBox
        presentationId={presentationId}
        setChats={setChats}
        chats={chats}
        sendChat={sendChat}
        show={showChat}
        toggleShow={toggleShowChat}
      />

      <QuestionBox
        show={showQuestion}
        toggleShow={toggleShowQuestion}
        questions={questions}
        answerQuestion={answerQuestion}
        upvoteQuestion={upvoteQuestion}
      />
    </>
  );
}
