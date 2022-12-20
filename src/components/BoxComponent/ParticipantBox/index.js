import React, { useEffect, useState } from 'react';
import ChatBox from '../ChatBox';
import QuestionBox from './QuestionBox';
import ToolBar from '../ToolBar';

export default function ParticipantBox({
  chats,
  questions,
  sendChat,
  askQuestion,
  upvoteQuestion,
}) {
  // manage new chat
  const [newChat, setNewChat] = useState(false);
  // update new chat status
  // manage chat
  const [showChat, setShowChat] = useState(false);
  // manage question
  const [showQuestion, setShowQuestion] = useState(false);
  // handle show chat and question
  useEffect(() => {
    setNewChat(!showChat && true);
  }, [chats]);
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
        sendChat={sendChat}
        chats={chats}
        show={showChat}
        toggleShow={toggleShowChat}
      />

      <QuestionBox
        upvoteQuestion={upvoteQuestion}
        askQuestion={askQuestion}
        questions={questions}
        show={showQuestion}
        toggleShow={toggleShowQuestion}
      />
    </>
  );
}
