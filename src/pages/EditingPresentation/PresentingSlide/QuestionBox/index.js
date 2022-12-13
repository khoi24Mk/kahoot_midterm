/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion';
import { Card, Carousel, Container } from 'react-bootstrap';
import { FaAngleRight, FaTimes } from 'react-icons/fa';

export default function QuestionBox({ show, toggleShow, questions }) {
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
              className="d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style={{
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
              }}
            >
              <FaAngleRight />
              <p className="mb-0 fw-bold">Live Question</p>
              <FaTimes style={{ cursor: 'pointer' }} onClick={toggleShow} />
            </Card.Header>

            <Card.Body style={{ overflowY: 'scroll' }} className="flex-grow-1">
              <Carousel variant="dark">
                {questions?.map((question) => (
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src="holder.js/800x400?text=Second slide&bg=282c34"
                      alt="Second slide"
                    />

                    <h5>First slide label</h5>
                    <p>
                      Nulla vitae elit libero, a pharetra augue mollis interdum.
                    </p>
                  </Carousel.Item>
                ))}
              </Carousel>
            </Card.Body>
          </Card>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
}
