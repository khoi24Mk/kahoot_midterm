import React, { useState } from 'react';
import ChatBox from '../ChatBox';
import ToolBar from '../ToolBar';
import QuestionBox from './QuestionBox';

export default function HostBox({
  chats,
  questions,
  sendChat,
  answerQuestion,
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
      />
    </>
  );
}
