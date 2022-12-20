import React, { useEffect, useState } from 'react';
import { Button, Spinner, Stack } from 'react-bootstrap';
import Constant from '~/constants';
import socketUtilActions from '~/socketUtils';
import Option from './Option';

export default function MultipleChoice({
  slide,
  presentation,
  sendMessage,
  profile,
}) {
  // state for answer
  const [checkedIndex, setCheckedIndex] = useState(-1);
  // submitting
  const [submiting, setSubmitting] = useState(false);
  // handle vote
  const handleVote = () => {
    setSubmitting(true);
    const metaData = {
      roomName: presentation.roomName,
      clientType: Constant.ClientType.member,
      messageType: Constant.ClientMessageType.voteSlide,
    };
    const message = {
      userId: profile.id,
      slideId: slide.id,
      answer: slide.options[checkedIndex],
    };
    sendMessage(socketUtilActions.getRawSocketMessage({ metaData, message }));
  };
  useEffect(() => {
    setSubmitting(false);
  }, [slide]);
  return (
    <Stack gap={3}>
      {slide?.userRecords?.length > 0 && (
        <div>
          <b>Your answer:</b> {slide?.userRecords[0]?.answer}
        </div>
      )}
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

      <Button
        size="lg"
        onClick={handleVote}
        disabled={
          submiting ||
          (slide?.userRecords !== null && slide?.userRecords?.length > 0)
        }
      >
        {submiting && <Spinner size="sm" />}
        Submit
      </Button>
    </Stack>
  );
}
