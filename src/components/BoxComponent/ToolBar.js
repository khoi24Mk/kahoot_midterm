import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { BsChatFill, BsQuestionCircleFill } from 'react-icons/bs';

export default function ToolBar({ toggleShowChat, toggleShowQuestion }) {
  return (
    <Stack
      style={{ position: 'absolute', bottom: '10px', right: '10px' }}
      variant="secondary"
      size="sm"
      direction="horizontal"
      gap={3}
    >
      <Button variant="secondary" onClick={toggleShowChat}>
        <BsChatFill size={30} />
      </Button>
      <Button variant="secondary" onClick={toggleShowQuestion}>
        <BsQuestionCircleFill size={30} />
      </Button>
    </Stack>
  );
}
