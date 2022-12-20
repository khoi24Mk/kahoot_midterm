/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Carousel,
  Container,
  Form,
  Stack,
} from 'react-bootstrap';
import { FaAngleRight, FaTimes } from 'react-icons/fa';

export default function QuestionBox({
  show,
  toggleShow,
  questions,
  answerQuestion,
  upvoteQuestion,
}) {
  const [sortedQuestions, setSortedQuestions] = useState([]);
  const [field, setField] = useState('dateCreated');
  const [order, setOrder] = useState('ascd');

  useEffect(() => {
    if (questions)
      setSortedQuestions(
        [...questions].sort((q1, q2) => {
          if (order === 'ascd') {
            return q1[field] - q2[field];
          }
          return q2[field] - q1[field];
        })
      );
  }, [questions, field, order]);
  return (
    show && (
      <Container
        style={{
          position: 'absolute',
          bottom: '60px',
          right: '10px',
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
            <p className="mb-0 fw-bold">Live Question</p>
            <FaTimes style={{ cursor: 'pointer' }} onClick={toggleShow} />
          </Card.Header>

          <Card.Body className="flex-grow-1">
            <Stack direction="horizontal" gap={3}>
              <Stack className="w-100" direction="horizontal">
                <div className="w-50 fw-bold px-3 bg-light h-100 d-flex justify-content-center align-items-center border-1">
                  Sort by
                </div>
                <Form.Select
                  value={field}
                  onChange={(e) => {
                    setField(e.target.value);
                  }}
                >
                  <option value="dateCreated">Asked Date</option>
                  <option value="votes">Number of votes</option>
                  <option value="answered">Answered</option>
                </Form.Select>
              </Stack>
              <Stack className="w-100" direction="horizontal">
                <div className="w-50 fw-bold px-3 bg-light h-100 d-flex justify-content-center align-items-center border-1">
                  Order
                </div>
                <Form.Select
                  placeholder="Sort By"
                  value={order}
                  onChange={(e) => {
                    setOrder(e.target.value);
                  }}
                >
                  <option value="ascd">Ascending</option>
                  <option value="desc">Descending</option>
                </Form.Select>
              </Stack>
            </Stack>
            <Carousel
              className="text-center d-flex flex-column justify-content-center h-100"
              variant="dark"
              indicators={false}
              interval={null}
            >
              {sortedQuestions?.map((question, index) => (
                <Carousel.Item key={question?.id} style={{ padding: '0 15%' }}>
                  <Stack gap={3}>
                    <h3 className="fw-bold">{question?.content}</h3>

                    <div className="d-flex align-items-center justify-content-center">
                      <img
                        referrerPolicy="no-referrer"
                        className="rounded-circle shadow me-2"
                        src={question?.user?.avatar || '/defaultAvatar.png'}
                        alt=""
                        style={{ width: '30px', height: '30px' }}
                      />
                      <div className="fw-bold" style={{ color: 'gray' }}>
                        {question?.user?.displayName}
                      </div>
                    </div>
                    <p style={{ color: 'gray' }}>
                      {new Date(question?.dateCreated).toLocaleString('en-US')}
                    </p>
                    {question?.answered ? (
                      <Button disabled variant="secondary">
                        Answered
                      </Button>
                    ) : (
                      <Button onClick={() => answerQuestion(question?.id)}>
                        Mark as answered
                      </Button>
                    )}
                    <div>
                      <Button
                        onClick={() => {
                          upvoteQuestion(question?.id);
                        }}
                        className=" position-relative"
                        variant="success"
                      >
                        <b>Vote</b>
                        <Button
                          variant="secondary"
                          style={{ width: '35px', height: '35px' }}
                          className="rounded-circle ms-2 fw-bold text-white"
                        >
                          {question?.votes}
                        </Button>
                      </Button>
                    </div>
                    <div style={{ fontSize: '1.4rem' }} className="fw-bold">
                      {index + 1}/{sortedQuestions.length}
                    </div>
                  </Stack>
                </Carousel.Item>
              ))}
            </Carousel>
          </Card.Body>
        </Card>
      </Container>
    )
  );
}
