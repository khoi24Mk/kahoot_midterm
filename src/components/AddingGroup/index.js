/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import createGroup from '~/api/normal/group/createGroup';
import getGroupList from '~/api/normal/group/getGroupList';

const schema = yup
  .object()
  .shape({
    groupName: yup.string().required('Please enter your class name'),
    description: yup.string(),
  })
  .required();

function AddingGroup({ setGroups }) {
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);

  const handleShowCreate = () => setShowCreate(true);

  // submitting
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await createGroup({
        groupName: data.groupName,
        description: data.description,
      });
      const resGroupList = await getGroupList();
      setGroups(resGroupList?.data?.object);
      handleCloseCreate();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Button
        className="position-absolute p-3 fw-bold d-flex align-items-lg-center"
        style={{ bottom: '30px', right: '30px', zIndex: 10 }}
        onClick={handleShowCreate}
      >
        <BsFillPlusCircleFill className="me-1" size={20} />
        ADD GROUP
      </Button>
      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Create classroom</Modal.Title>
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
            disabled={submitting}
            variant="primary"
            type="submit"
            onClick={() => {
              if (!errors) handleCloseCreate();
            }}
            form="createGroupForm"
          >
            {submitting && <Spinner size="sm" />}
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddingGroup;
