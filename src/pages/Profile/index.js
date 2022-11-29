/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.css';
import imageCompression from 'browser-image-compression';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { MdAddAPhoto } from 'react-icons/md';
import * as yup from 'yup';
import getGroupList from '~/api/normal/getGroupList';
import privateAxios from '~/api/PrivateAxios';
import Loading from '~/components/Loading';
import Notify from '~/components/Notification';
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

/**
 *
 * @returns Profile
 */
function Profile() {
  const [mygroups, setMyGroups] = useState([]);
  useEffect(() => {
    const asyncGroup = async () => {
      try {
        const reponse = await getGroupList();
        console.log('ASYNC');
        console.log(reponse);
        setMyGroups(reponse);
      } catch (error) {
        //
      }
    };
    asyncGroup();
  }, []);

  console.log('EFFECT');
  console.log(mygroups);

  const [notify, setNotify] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const context = useContext(AuthContext);
  const { profile, setProfile } = context;
  const [loading, setLoading] = useState({
    flag: false,
    msg: '',
  });
  console.log('FIRST');
  console.log(loading);

  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState({
    url: '',
    obj: null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [disableEdit, setEditable] = useState(true);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file !== null) {
      setAvatar({ url: URL.createObjectURL(file), obj: file });
    }
  };
  const handleSubmitAvt = async () => {
    console.log('Submit');

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const file = avatar.obj;
    try {
      handleClose();
      setLoading({ flag: true, msg: 'Uploading img . . .' });
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
      setLoading({ flag: false, msg: 'Uploading image . . .' });
      setNotify({ msg: 'Upload success', type: 'success', show: true });
      console.log(notify);
    } catch (e) {
      ///
      setNotify({ msg: 'Upload Failed', type: 'warning', show: true });
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading({ flag: true, msg: 'Update profile . . .' });
      console.log('onSubmit');
      console.log(data);
      const reponse = await privateAxios.put('/me', {
        username: data.username,
        displayName: data.displayName,
        email: data.email,
      });
      setProfile(reponse?.data.object);

      setLoading({ flag: false, msg: 'Update profile . . .' });
      setNotify({ msg: 'Update profile success', type: 'success', show: true });
    } catch (error) {
      console.log('onSubmit error');
      setNotify({ msg: 'Upload profile failed', type: 'warning', show: true });
    }
  };

  const handleEdit = () => {
    console.log('EDITc');
    setEditable(false);
  };
  console.log('PROFILE');
  console.log(loading);
  console.log(loading.msg);
  return (
    <>
      <Notify notify={notify} setShow={setNotify} />
      {loading.flag ? (
        <Loading msg={loading?.msg} className={clsx(styles.loading)} />
      ) : (
        <div className={clsx('container')}>
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
                <Modal.Title>Avatar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  alt="not fount"
                  width="250px"
                  src={avatar.url}
                  //   src={`data:image/jpeg;base64,${avatar}`}
                />
                <Form>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Choose an image</Form.Label>
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
                  <p>{mygroups.length}</p>
                  <p>group</p>
                </div>

                <div className={clsx(styles.info_detail)}>
                  <p>10</p>
                  <p>group owner</p>
                </div>
                <div className={clsx(styles.info_detail)}>
                  <p>10</p>
                  <p>group co-owner</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              initial={{ y: -100, opacity: 0 }}
              className={clsx(styles.info)}
            >
              <Form
                className={clsx(styles.profile_form)}
                id="profile-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Edit Profile"
                  defaultValue={!disableEdit}
                  onChange={() => {
                    setEditable(!disableEdit);
                    setProfile(profile);
                    console.log('switch selected');
                  }}
                />
                <fieldset disabled={disableEdit}>
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
                        // login by email
                        disabled={profile.username === null}
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
                {disableEdit ? (
                  <div />
                ) : (
                  <Button
                    className={clsx(styles.submit_btn)}
                    variant="outline-info"
                    type="submit"
                  >
                    Submit
                  </Button>
                )}
              </Form>
            </motion.div>
            <div className={clsx(styles.group)}>
              <div className={clsx(styles.group_filter)}>
                <p>Recent group</p>
                <a href="/home">Show all </a>
              </div>
              <Carousel className={styles.gallery}>
                {mygroups.map((group) => {
                  console.log('RENDER');
                  console.log(mygroups);
                  return (
                    <Carousel.Item>
                      <img
                        className={styles.img_gr}
                        src={avt}
                        alt="Second slide"
                      />

                      <Carousel.Caption>
                        <h3>{group.groupName}</h3>
                        <p>{group.description}</p>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
