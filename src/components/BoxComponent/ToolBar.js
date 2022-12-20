import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { BsChatFill, BsQuestionCircleFill } from 'react-icons/bs';

export default function ToolBar({
  toggleShowChat,
  toggleShowQuestion,
  newChat,
}) {
  return (
    <Stack
      style={{ position: 'absolute', bottom: '10px', right: '10px' }}
      variant="secondary"
      size="sm"
      direction="horizontal"
      gap={3}
    >
      <div className="position-relative">
        {newChat && (
          <Button
            className="p-1 fw-bold position-absolute"
            variant="success"
            style={{ fontSize: '0.5rem', top: '-10px', right: '-10px' }}
          >
            new
          </Button>
        )}
        <Button variant="secondary" onClick={toggleShowChat}>
          <BsChatFill size={30} />
        </Button>
      </div>
      <Button variant="secondary" onClick={toggleShowQuestion}>
        <BsQuestionCircleFill size={30} />
      </Button>
    </Stack>
  );
}
