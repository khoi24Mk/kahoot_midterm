import { Card, Container, FormControl } from 'react-bootstrap';
import { FaAngleRight, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import { IoSendSharp } from 'react-icons/io5';
import ChatItem from './ChatItem';

export default function ChatBox({ show, toggleShow }) {
  const MotionContainer = motion(Container);
  return (
    <AnimatePresence>
      {show && (
        <MotionContainer
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '10px',
            overflowY: 'hidden',
            fontSize: '1rem',
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

            <Card.Body style={{ overflowY: 'scroll' }} className="flex-grow-1">
              <ChatItem
                avatar="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                content="Hello and thank you for visiting MDBootstrap. Please click the
                video below."
                fromMe
                time="20:50"
                name="Vo Dinh Phuc"
              />
              <ChatItem
                avatar="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                content="Hello and thank you for visiting MDBootstrap. Please click the
                video below."
                time="20:50"
                name="Vo Dinh Phuc"
              />
            </Card.Body>
            <hr />
            <div className="p-3 pt-1 d-flex align-items-center">
              <FormControl
                className="form-outline me-3 border-0"
                type="text"
                placeholder="Type your message..."
              />
              <IoSendSharp color="darkblue" size={30} />
            </div>
          </Card>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
}
