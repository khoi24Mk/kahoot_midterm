/* eslint-disable indent */
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AiFillCaretRight, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import * as yup from 'yup';
import createPresentation from '~/api/group/createPresentation';
import deletePresentation from '~/api/group/deletePresentation';
import getPresentationInGroup from '~/api/group/getPresentationGroup';

const schema = yup
  .object()
  .shape({
    presentationName: yup
      .string()
      .required('Please enter your presentation name'),
    description: yup.string(),
  })
  .required();

function PresentationGroup({
  id: groupId,
  presentations,
  setPresentations,
  myRole,
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [createResponse, setCreateResponse] = useState('');
  const [deleteList, setDeleteList] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setAdding(true);
    try {
      setShowCreate(false);
      const response = await createPresentation({
        presentationName: data.presentationName,
        description: data.description,
        groupId,
      });
      const retPresentationList = await getPresentationInGroup({ id: groupId });
      setPresentations(retPresentationList);

      setShowAlert(true);
      setCreateResponse('success');
      return response;
    } catch (err) {
      setCreateResponse('danger');
      return null;
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteCheck = (presentationId) => {
    const newDeleteList = deleteList.includes(presentationId)
      ? deleteList.filter((i) => i !== presentationId)
      : [...deleteList, presentationId];
    setDeleteList(newDeleteList);
  };

  const checkDeleteAll = (ev) => {
    const value = ev.target.checked;
    if (value) {
      setDeleteList(presentations.map((presentation) => presentation.id));
    } else {
      setDeleteList([]);
    }
  };
  const handleDeleteSubmit = async () => {
    setDeleting(true);
    if (deleteList.length < 1) return;
    try {
      await Promise.all(
        deleteList.map(async (presentationId) => {
          return deletePresentation({ presentationId });
        })
      );

      const retPresentationList = await getPresentationInGroup({ id: groupId });
      setPresentations(retPresentationList);

      setDeleteList([]);
    } catch (err) {
      setCreateResponse('danger');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Container fluid>
        {/* tool bar */}
        <Row className={`mb-5 ${myRole === 'MEMBER' ? 'd-none' : ''}`}>
          <Col>
            <Button
              style={{ backgroundColor: '#C26407' }}
              onClick={() => setShowCreate(true)}
              disabled={adding}
            >
              {adding && <Spinner size="sm" />}
              Add presentation
            </Button>
            <Button
              variant="danger"
              className="mx-2"
              hidden={deleteList.length < 1}
              onClick={handleDeleteSubmit}
              disabled={deleting}
            >
              {deleting && <Spinner size="sm" />}
              Delete
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
        <Row>
          <Table style={{ fontSize: '1rem' }} hover>
            <thead>
              <tr style={{ color: 'darkgray' }}>
                <th>
                  <Form.Check
                    inline
                    type="checkbox"
                    checked={presentations?.length === deleteList?.length}
                    onChange={(event) => checkDeleteAll(event)}
                  />
                </th>
                <th>Name</th>
                <th>Created at</th>
                <th>Modified at</th>
                {myRole !== 'MEMBER' && <th> </th>}
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {presentations.map((presentation) => (
                <tr key={presentation.id}>
                  <td className="py-4">
                    <Form.Check
                      inline
                      type="checkbox"
                      onChange={() => handleDeleteCheck(presentation.id)}
                      checked={deleteList.includes(presentation.id)}
                    />
                  </td>
                  <td className="py-4">{presentation.presentationName}</td>
                  <td className="py-4">
                    {new Date(presentation.dateCreated).toLocaleString('en-US')}
                  </td>
                  <td className="py-4">
                    {presentation.dateUpdated > 0
                      ? new Date(presentation.dateUpdated).toLocaleString(
                          'en-US'
                        )
                      : '----'}
                  </td>
                  {myRole !== 'MEMBER' && (
                    <td>
                      <div className="py-4">
                        <Link to={`/presentation/${presentation.id}/slide`}>
                          <AiFillEdit
                            className="p-1 rounded-circle"
                            style={{
                              backgroundColor: 'lightgray',
                              cursor: 'pointer',
                            }}
                            size={30}
                          />
                        </Link>
                      </div>
                    </td>
                  )}
                  <td>
                    <div className="py-4">
                      <Link to={`/presentation/${presentation.id}`}>
                        <AiFillCaretRight
                          className="p-1 rounded-circle"
                          style={{
                            backgroundColor: 'lightgray',
                            cursor: 'pointer',
                          }}
                          size={30}
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
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

export default PresentationGroup;
