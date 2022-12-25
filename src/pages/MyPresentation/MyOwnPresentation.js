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
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import * as yup from 'yup';
import createPresentation from '~/api/normal/presentation/createPresentation';
import deletePresentation from '~/api/normal/presentation/deletePresentation';
import getMyPresentation from '~/api/normal/presentation/getMyPresentation';
import Loading from '~/components/Loading';
import MyPresentationList from './MyPresentationList';

const schema = yup
  .object()
  .shape({
    presentationName: yup
      .string()
      .required('Please enter your presentation name'),
    description: yup.string(),
  })
  .required();

function MyOwnPresentation() {
  const [showCreate, setShowCreate] = useState(false);
  const [deleteList, setDeleteList] = useState([]);
  // Manage adding and deleting state
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  // Manage presentations
  const [presentations, setPresentations] = useState([]);

  // Get presentations
  const navigate = useNavigate();
  useEffect(() => {
    const asyncGetPresentations = async () => {
      try {
        const myPresentationRes = await getMyPresentation();
        setPresentations(myPresentationRes.data.object);
      } catch (err) {
        toast.error(err?.response?.data?.message);
        if (err?.response?.status === 403) {
          navigate({ pathname: '/notPermission' });
        }
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
      if (err?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
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
      if (err?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      <Container fluid className="pt-3 h-100 d-flex flex-column">
        {/* tool bar */}
        <Row>
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
        <hr />

        <Row>
          <MyPresentationList
            deletable
            checkDeleteAll={checkDeleteAll}
            deleteList={deleteList}
            handleDeleteCheck={handleDeleteCheck}
            presentations={presentations}
          />
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

export default MyOwnPresentation;
