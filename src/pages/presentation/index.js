/* eslint-disable no-unused-vars */
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, Carousel, Col, Container, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import getPresentationSlide from '~/api/normal/getPresentationSlide';

function Presentation() {
  const { id } = useParams();
  const [slideList, setSlideList] = useState([]);
  const [curQuestion, setCurQuestion] = useState(1);
  const asyncGetGroup = async () => {
    const retSlide = await getPresentationSlide({ presentationId: id });
    console.log(retSlide);
    console.log(slideList);
    setSlideList(retSlide);
    return retSlide;
  };
  //   const query = useQuery({
  //     queryKey: ['presentaionSlide'],
  //     queryFn: asyncGetGroup,
  //   });
  const tempdata = JSON.parse(`{
    "message": "Successfully",
    "object": [
        {
            "id": 50,
            "content": "Who is Khoi Bui?",
            "options": [
                "3"
            ],
            "answer": "This is another answer",
            "userRecords": [],
            "presenting": false,
            "links": [
                {
                    "rel": "self",
                    "href": "https://kahoot-clone-vodinhphuc.herokuapp.com/api/v1/presentation/1/slide/50"
                }
            ]
        },
        {
            "id": 51,
            "content": "Who is Khoi ?",
            "options": [
                "this is option",
                "this is option",
                "this is option",
                "this is option"
            ],
            "answer": "This is another answer",
            "userRecords": [],
            "presenting": false,
            "links": [
                {
                    "rel": "self",
                    "href": "https://kahoot-clone-vodinhphuc.herokuapp.com/api/v1/presentation/1/slide/51"
                }
            ]
        },
        {
            "id": 53,
            "content": "How old are you?",
            "options": [
                "This isn't answer",
                "this is option"
            ],
            "answer": "This is another answer",
            "userRecords": [],
            "presenting": false,
            "links": [
                {
                    "rel": "self",
                    "href": "https://kahoot-clone-vodinhphuc.herokuapp.com/api/v1/presentation/1/slide/53"
                }
            ]
        }
    ],
    "errorCode": 0
}`);
  const handleNext = (e) => {
    setCurQuestion(curQuestion + 1);
  };

  const handleFinishQuestion = (e) => {
    console.log('form submit', e);
  };
  const data = tempdata.object.map((item, pos, td) => (
    <Form
      id={`slide-${item.id}`}
      onSubmit={handleFinishQuestion}
      className="jutify-content-center"
    >
      <Form.Label>{item.content}</Form.Label>
      {item.options.map((i) => (
        <div key={item.id} className="mb-3">
          <Form.Check type="checkbox" label={i} />
        </div>
      ))}
      <Button type="submitt" form={`slide-${item.id}`} onClick={handleNext}>
        {pos === td.length - 1 ? 'Submit' : 'Next'}
      </Button>
    </Form>
  ));
  return (
    <Container className="justify-content-center">
      <Row className="jutify-content-center">
        Question {curQuestion}/{data.length}
      </Row>
      <Row>
        <Col>{data.map((d, i) => (i === curQuestion - 1 ? d : undefined))}</Col>
      </Row>
    </Container>
  );
}

export default Presentation;
