/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-no-bind */
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Container, FormControl, Spinner } from 'react-bootstrap';
import { FaAngleRight, FaTimes } from 'react-icons/fa';
import { IoSendSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';
import loadMoreChatOfPresentation from '~/api/normal/presentation/loadMoreChatOfPresentation';
import ChatItem from './ChatItem';

export default function ChatBox({
  show,
  toggleShow,
  setChats,
  chats,
  sendChat,
  presentationId,
}) {
  const [message, setMessage] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const chatRef = useRef(null);

  // scroll to end
  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [show]);

  async function handleScroll(e) {
    if (e.target.scrollTop === 0 && !loadMore) {
      setLoadMore(true);
      try {
        const chatsRes = await loadMoreChatOfPresentation({
          presentationId,
          fromChat: chats[0]?.id,
        });
        setChats([...chatsRes?.data?.object, ...chats]);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      } finally {
        setLoadMore(false);
      }
    }
  }

  // handle send chat
  const handleSendChat = () => {
    sendChat(message);
    setMessage('');
  };
  return (
    show && (
      <Container
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '10px',
          overflowY: 'hidden',
          fontSize: '1rem',
          zIndex: 10,
        }}
        className="w-75 h-75"
      >
        <Card
          className="d-flex flex-column h-100"
          style={{ borderRadius: '15px', borderColor: 'black' }}
        >
          <Card.Header
            className="d-flex justify-content-between align-items-center p-3 bg-dark text-white border-bottom-0"
            style={{
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
            }}
          >
            <FaAngleRight />
            <p className="mb-0 fw-bold">Live chat</p>
            <FaTimes style={{ cursor: 'pointer' }} onClick={toggleShow} />
          </Card.Header>

          <Card.Body
            style={{ overflowY: 'scroll' }}
            className="flex-grow-1"
            onScroll={handleScroll.bind(this)}
          >
            {loadMore && (
              <div className="text-center" style={{ color: 'gray' }}>
                <Spinner size="sm" className="me-2" />
                <span>Loading...</span>
              </div>
            )}
            {chats?.map((chat) => (
              <ChatItem chat={chat} key={chat.id} />
            ))}
            <div ref={chatRef} />
          </Card.Body>
          <hr />
          <div className="p-3 pt-1 d-flex align-items-center">
            <FormControl
              key={1}
              value={message}
              onChange={(e) => {
                e.preventDefault();
                setMessage(e.target.value);
              }}
              className="form-outline me-3 border-0"
              type="text"
              placeholder="Type your message..."
            />
            <Button
              onClick={handleSendChat}
              disabled={!message || message.trim().length < 0}
            >
              <IoSendSharp color="white" size={20} />
            </Button>
          </div>
        </Card>
      </Container>
    )
  );
}
