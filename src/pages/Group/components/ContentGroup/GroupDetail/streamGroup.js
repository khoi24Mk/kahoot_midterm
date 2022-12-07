/* eslint-disable indent */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Modal,
  ToastContainer,
  Toast,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import createPresentation from '~/api/group/createPresentation';
import deletePresentation from '~/api/group/deletePresentation';
import PresentationItem from './presentationItem';

const schema = yup
  .object()
  .shape({
    presentationName: yup
      .string()
      .required('Please enter your presentation name'),
    description: yup.string(),
  })
  .required();

function StreamGroup({ id, presentations, query }) {
  const [showCreate, setShowCreate] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [createResponse, setCreateResponse] = useState('');
  const [deleteList, setDeleteList] = useState([]);
  const [deleteOption, setDeleteOption] = useState(false);
  const [deleteAll, setDeleteAll] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const response = await createPresentation({
        presentationName: data.presentationName,
        description: data.description,
        groupId: id,
      });
      console.log(response);
      setShowAlert(true);
      setCreateResponse('success');
      setShowCreate(false);
      query.refetch();
    } catch (err) {
      setCreateResponse('danger');
      console.log(err);
    }
  };

  const handleDeleteCheck = (item, val) => {
    if (val) {
      setDeleteList([...deleteList, item]);
      setDeleteOption(true);
    } else {
      if (deleteList.length === 1) setDeleteOption(false);
      setDeleteList(deleteList.filter((i) => i.id !== item.id));
    }
  };

  const checkDeleteAll = (ev) => {
    const value = ev.target.checked;
    if (value) {
      setDeleteAll(true);
      setDeleteOption(true);
      setDeleteList([...presentations]);
    } else {
      setDeleteAll(false);
      setDeleteOption(false);
      setDeleteList([]);
    }
  };
  const handleDeleteSubmit = async () => {
    if (deleteList.length < 1) return;
    try {
      const response = await Promise.all(
        deleteList.map(async (item) => {
          return deletePresentation({ presentationId: item.id });
        })
      );
      setDeleteList([]);
      setDeleteAll(false);
      setDeleteOption(false);
      query.refetch();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container>
        <Col>
          <Row className="mb-5">
            <Col>
              <Button onClick={() => setShowCreate(true)}>
                + New presentation
              </Button>
            </Col>
            <Col>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </Col>
          </Row>
          <Row className="mb-5 d-flex">
            <Col>
              <div>
                <Form.Check
                  inline
                  type="checkbox"
                  checked={deleteAll}
                  onChange={checkDeleteAll}
                />
                <Button>Name</Button>
                <Button
                  variant="danger"
                  className="mx-2"
                  hidden={!deleteOption}
                  onClick={handleDeleteSubmit}
                >
                  Delete
                </Button>
              </div>
            </Col>
            <Col className="flex-end">
              <Button className="flex-end">Modify</Button>
            </Col>
          </Row>
          <Row>
            {presentations.map((presentation) => (
              <PresentationItem
                item={presentation}
                deleteOption={handleDeleteCheck}
                deleteCheck={
                  deleteList.find((i) => i.id === presentation.id) !== undefined
                }
                deleteAll={deleteAll}
              />
            ))}
          </Row>
        </Col>
      </Container>

      <Modal show={showCreate} onHide={() => setShowCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            id="createPresentationForm"
            className="flex"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Control
              {...register('presentationName')}
              type="text"
              placeholder="presentation name"
            />
            <Form.Text className="text-muted">
              <ErrorMessage
                errors={errors}
                name="presentationName"
                render={({ message }) => (
                  <p style={{ color: 'red', fontSize: '1rem' }}>{message}</p>
                )}
              />
            </Form.Text>
            <hr />
            <Form.Control
              {...register('description')}
              type="textarea"
              row={3}
              placeholder="description"
            />
            <Form.Text name="desctiption" className="text-muted"></Form.Text>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              if (!errors) setShowCreate(false);
            }}
            form="createPresentationForm"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showAlert}
          bg={createResponse}
          onClose={() => setShowAlert(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img className="rounded me-2" alt="" />
            <strong className="me-auto">Create Class Notification</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>
            {createResponse === 'success'
              ? 'Create class successfully!!!'
              : 'Create class failure!!!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default StreamGroup;
