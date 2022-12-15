import { Button, Card, Carousel, Container, Stack } from 'react-bootstrap';
import { FaAngleRight, FaTimes } from 'react-icons/fa';

export default function QuestionBox({
  show,
  toggleShow,
  questions,
  answerQuestion,
}) {
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

          <Card.Body className="flex-grow-1">
            <Carousel
              className="text-center d-flex flex-column justify-content-center h-100"
              variant="dark"
              indicators={false}
              interval={null}
            >
              {questions?.map((question) => (
                <Carousel.Item key={question?.id} style={{ padding: '0 15%' }}>
                  <Stack gap={3}>
                    <h3 className="fw-bold">{question?.content}</h3>

                    <div className="d-flex align-items-center justify-content-center">
                      <img
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
