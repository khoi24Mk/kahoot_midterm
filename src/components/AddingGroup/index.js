/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import {
  ButtonGroup,
  Dropdown,
  Row,
  Col,
  Modal,
  Image,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';
import { ErrorMessage } from '@hookform/error-message';
import clsx from 'clsx';
import createGroup from '~/api/group/createGroup';
import styles from './AddingGroup.module.css';

const schema = yup
  .object()
  .shape({
    groupName: yup.string().required('Please enter your class name'),
    description: yup.string(),
  })
  .required();

function AddingGroup() {
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);

  const [showAlert, setShowAlert] = useState(false);
  const [createResponse, setCreateResponse] = useState('');
  const handleShowCreate = () => setShowCreate(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await createGroup({
        groupName: data.groupName,
        description: data.description,
      });
      setShowAlert(true);
      setCreateResponse('success');
      handleCloseCreate();
    } catch (error) {
      // setLoginErr(error?.response?.data?.message);
      setCreateResponse('danger');
      console.log(error);
    }
  };

  return (
    <div>
      <span className={clsx(styles.Adding)} onClick={handleShowCreate}>
        <AiOutlineAppstoreAdd size={30} />
      </span>
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} id="createGroupForm">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                {...register('groupName')}
                type="text"
                aria-label="Class name"
                aria-describedby="basic-addon1"
                autoFocus
              />
              <Form.Text className="text-muted">
                <ErrorMessage
                  errors={errors}
                  name="groupName"
                  render={({ message }) => (
                    <p style={{ color: 'red', fontSize: '1rem' }}>{message}</p>
                  )}
                />
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                {...register('description')}
                type="textarea"
                row={3}
              />
              <Form.Text name="desctiption" className="text-muted" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowCreate}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              if (!errors) handleCloseCreate();
            }}
            form="createGroupForm"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddingGroup;
