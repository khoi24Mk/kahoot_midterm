/* eslint-disable indent */
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Spinner,
  Table,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AiFillCaretRight, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as yup from 'yup';
import createPresentation from '~/api/normal/presentation/createPresentation';
import deletePresentation from '~/api/normal/presentation/deletePresentation';
import getMyPresentation from '~/api/normal/presentation/getMyPresentation';
import Loading from '~/components/Loading';

const schema = yup
  .object()
  .shape({
    presentationName: yup
      .string()
      .required('Please enter your presentation name'),
    description: yup.string(),
  })
  .required();

function MyPresentation() {
  const [showCreate, setShowCreate] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  // manage adding and deleting state
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  // manage presentations
  const [presentations, setPresentations] = useState([]);

  // get presentations
  useEffect(() => {
    const asyncGetPresentations = async () => {
      try {
        const myPresentationRes = await getMyPresentation();
        setPresentations(myPresentationRes.data.object);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    asyncGetPresentations();
  }, []);
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
      });
      const myPresentationRes = await getMyPresentation();
      setPresentations(myPresentationRes.data.object);

      toast.success(myPresentationRes?.data?.message);
      return response;
    } catch (err) {
      toast.error(err?.response?.data?.message);
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
      const myPresentationRes = await getMyPresentation();
      setPresentations(myPresentationRes?.data?.object);
      toast.success(myPresentationRes?.data?.message);

      setDeleteList([]);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      <Container className="pt-3">
        {/* tool bar */}
        <Row className="mb-5">
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
                <th> </th>
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
    </>
  );
}

export default MyPresentation;
