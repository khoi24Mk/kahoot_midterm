/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.css';
import imageCompression from 'browser-image-compression';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { BiEdit } from 'react-icons/bi';
import { MdAddAPhoto } from 'react-icons/md';
import * as yup from 'yup';
import privateAxios from '~/api/PrivateAxios';
import { AuthContext } from '~/Context';
import { avt } from '~/img';
import styles from './profile.module.css';

const schema = yup
  .object()
  .shape({
    username: yup.string().required(),
    email: yup.string().email().required(),
    displayName: yup.string().required(),
  })
  .required();

function Profile() {
  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const context = useContext(AuthContext);
  const { profile, setProfile } = context;

  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editable, setEditable] = useState(true);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  const handleSubmitAvt = async () => {
    console.log('Submit');

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const file = avatar;
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        'compressedFile instanceof Blob',
        compressedFile instanceof Blob
      ); // true
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      ); // smaller than maxSizeMB
      const formData = new FormData();
      formData.append('image', compressedFile);
      const reponse = await privateAxios.post('/me/uploadAvatar', formData);
      setProfile(reponse?.data.object);
    } catch (e) {
      ///
    }
  };

  const [registerErr, setRegisterErr] = useState('');
  const onSubmit = async (data) => {
    try {
      console.log('onSubmit');
      console.log(data);
      const reponse = await privateAxios.put('/me', {
        username: data.username,
        displayName: data.displayName,
        email: data.email,
      });
      setProfile(reponse?.data.object);
    } catch (error) {
      console.log('onSubmit error');
      setRegisterErr(error.response?.data?.message);
    }
  };

  const handleEdit = () => {
    console.log('EDITc');
    setEditable(false);
  };
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.header)}>
        <motion.div
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          initial={{ x: -100 }}
          className={clsx(styles.avt_frame)}
        >
          <div style={{ height: '100%', position: 'relative' }}>
            <img
              src={profile.avatar || avt}
              alt=""
              className={clsx(styles.avt)}
            />
            <div onClick={handleShow} className={styles.avtUpload}>
              <MdAddAPhoto color="white" />
            </div>
          </div>
        </motion.div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control
                  onChange={handleUpload}
                  accept="image/png, image/jpg"
                  type="file"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button onClick={handleSubmitAvt} variant="primary">
              Understood
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className={clsx(styles.body)}>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          initial={{ y: -100, opacity: 0 }}
          className={clsx(styles.overview)}
        >
          {/* <button className={clsx(styles.edit_btn)}>Edit profile</button> */}
          <Button
            form="profile-form"
            type="submit"
            onClick={handleEdit}
            className={clsx(styles.edit_btn)}
            variant="outline-primary"
          >
            Edit profile
          </Button>{' '}
          <div className={clsx(styles.overview_info)}>
            <div className={clsx(styles.info_detail)}>
              <p>10</p>
              <p>group</p>
            </div>

            <div className={clsx(styles.info_detail)}>
              <p>10</p>
              <p>group</p>
            </div>
            <div className={clsx(styles.info_detail)}>
              <p>10</p>
              <p>group</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          initial={{ y: -100, opacity: 0 }}
          className={clsx(styles.info)}
        >
          <Form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={editable}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <InputGroup>
                    <Form.Control
                      {...register('email')}
                      defaultValue={profile.email}
                      type="email"
                      placeholder="Enter email"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon1"
                    />
                    <InputGroup.Text id="basic-addon1">
                      <BiEdit />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    {...register('displayName')}
                    defaultValue={profile.displayName}
                  />
                  <Form.Text className="text-muted">
                    <ErrorMessage
                      errors={errors}
                      name="displayName"
                      render={({ message }) => (
                        <p className={clsx(styles.error)}>{message}</p>
                      )}
                    />
                  </Form.Text>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    {...register('username')}
                    defaultValue={profile.username}
                  />
                  <Form.Text className="text-muted">
                    <ErrorMessage
                      errors={errors}
                      name="username"
                      render={({ message }) => (
                        <p className={clsx(styles.error)}>{message}</p>
                      )}
                    />
                  </Form.Text>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPassword">
                  {/* <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" /> */}
                </Form.Group>
              </Row>
            </fieldset>
            <Button
              className={clsx(styles.login_btn)}
              variant="outline-info"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </motion.div>
        <div className={clsx(styles.group)}>
          <div className={clsx(styles.group_filter)}>
            <p>Recent group</p>
            <a href="/home">Show all </a>
          </div>
          <Carousel className={styles.gallery}>
            <Carousel.Item>
              <img className={styles.img_gr} src={avt} alt="Second slide" />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className={styles.img_gr} src={avt} alt="Second slide" />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className={styles.img_gr} src={avt} alt="Second slide" />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Profile;
