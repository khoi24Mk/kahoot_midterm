import React, { useState } from 'react';
import ChatBox from '../ChatBox';
import QuestionBox from './QuestionBox';
import ToolBar from '../ToolBar';

export default function ParticipantBox({
  chats,
  questions,
  sendChat,
  askQuestion,
}) {
  // manage chat
  const [showChat, setShowChat] = useState(false);
  // manage question
  const [showQuestion, setShowQuestion] = useState(false);
  // handle show chat and question
  const toggleShowChat = () => {
    setShowChat(!showChat);
  };
  const toggleShowQuestion = () => {
    setShowQuestion(!showQuestion);
  };
  return (
    <>
      <ToolBar
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
        askQuestion={askQuestion}
        questions={questions}
        show={showQuestion}
        toggleShow={toggleShowQuestion}
      />
    </>
  );
}
