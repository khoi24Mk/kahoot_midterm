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
import { useForm } from 'react-hook-form';
import { MdAddAPhoto } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import getGroupList from '~/api/normal/group/getGroupList';
import privateAxios from '~/api/PrivateAxios';
import Loading from '~/components/Loading';
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
  const navigate = useNavigate();
  const [mygroups, setMyGroups] = useState([]);
  useEffect(() => {
    const asyncGroup = async () => {
      try {
        const resGroupList = await getGroupList();
        setMyGroups(resGroupList?.data?.object);
      } catch (err) {
        toast.error(err?.response?.data?.message);
        if (err?.response?.status === 403) {
          navigate({ pathname: '/notPermission' });
        }
      }
    };
    asyncGroup();
  }, []);

  const ownerGroups = mygroups?.filter((item) => item.role === 'OWNER');
  const coOwnerGroups = mygroups?.filter((item) => item.role === 'CO_OWNER');
  //   const memberGroups = groupList?.filter((item) => item.role === 'MEMBER');

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

  const [show, setShow] = useState(false);
  const [avatar, setAvatar] = useState({
    url: profile.avatar,
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

      const formData = new FormData();
      formData.append('image', compressedFile);
      const reponse = await privateAxios.post('/me/uploadAvatar', formData);
      setProfile(reponse?.data.object);
      setLoading({ flag: false, msg: 'Uploading image . . .' });
      toast.success('Upload success');
    } catch (e) {
      ///
      toast.error(e?.response?.data?.message);
      if (e?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading({ flag: true, msg: 'Update profile . . .' });

      const reponse = await privateAxios.put('/me', {
        username: data.username,
        displayName: data.displayName,
        email: data.email,
      });
      setProfile(reponse?.data.object);

      setLoading({ flag: false, msg: 'Update profile . . .' });

      toast.success('Update profile success');
    } catch (error) {
      toast.error(error?.response?.data?.message);
      if (error?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    }
  };

  return (
    <div className="overflow-scroll h-100">
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
                  referrerPolicy="no-referrer"
                  src={profile.avatar || '/defaultAvatar.png'}
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
                <Modal.Title style={{ fontWeight: 'bold' }}>Avatar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  referrerPolicy="no-referrer"
                  alt="not fount"
                  width="250px"
                  src={avatar.url}
                />
                <Form>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label />
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
                  Save
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
              <div className={clsx(styles.overview_info)}>
                <div className={clsx(styles.info_detail)}>
                  <p>{mygroups.length}</p>
                  <p>group</p>
                </div>

                <div className={clsx(styles.info_detail)}>
                  <p>{ownerGroups.length}</p>
                  <p>group owner</p>
                </div>
                <div className={clsx(styles.info_detail)}>
                  <p>{coOwnerGroups.length}</p>
                  <p>group co-owner</p>
                </div>
              </div>
            </motion.div>
            <div className={clsx(styles.group_info)}>
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                initial={{ y: -100, opacity: 0 }}
                className={clsx(styles.info)}
              >
                <Form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="d-flex justify-content-between align-items-center">
                    <Form.Check
                      type="switch"
                      label="Edit Profile"
                      defaultValue={!disableEdit}
                      className="fw-bold"
                      onChange={() => {
                        setEditable(!disableEdit);
                        setProfile(profile);
                      }}
                    />
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
                  </div>
                  <fieldset disabled={disableEdit}>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label
                        style={{ fontSize: '1rem', color: 'gray' }}
                        className="fw-bold"
                      >
                        Email
                      </Form.Label>
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
                      <Form.Text
                        className={clsx(styles.err_frame, 'text-muted')}
                      >
                        {disableEdit ? (
                          <div />
                        ) : (
                          <ErrorMessage
                            errors={errors}
                            name="email"
                            render={({ message }) => (
                              <p className={clsx(styles.error)}>{message}</p>
                            )}
                          />
                        )}
                      </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label
                        style={{ fontSize: '1rem', color: 'gray' }}
                        className="fw-bold"
                      >
                        Name
                      </Form.Label>
                      <Form.Control
                        {...register('displayName')}
                        defaultValue={profile.displayName}
                      />
                      <Form.Text
                        className={clsx(styles.err_frame, 'text-muted')}
                      >
                        {disableEdit ? (
                          <div />
                        ) : (
                          <ErrorMessage
                            errors={errors}
                            name="displayName"
                            render={({ message }) => (
                              <p className={clsx(styles.error)}>{message}</p>
                            )}
                          />
                        )}
                      </Form.Text>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label
                        style={{ fontSize: '1rem', color: 'gray' }}
                        className="fw-bold"
                      >
                        Username
                      </Form.Label>
                      <Form.Control
                        {...register('username')}
                        defaultValue={profile.username}
                        // login by email
                        disabled={profile.username === null}
                      />
                      <Form.Text
                        className={clsx(styles.err_frame, 'text-muted')}
                      >
                        {disableEdit ? (
                          <div />
                        ) : (
                          <ErrorMessage
                            errors={errors}
                            name="username"
                            render={({ message }) => (
                              <p className={clsx(styles.error)}>{message}</p>
                            )}
                          />
                        )}
                      </Form.Text>
                    </Form.Group>
                  </fieldset>
                </Form>
                <div className="text-end">
                  <Button
                    as={Link}
                    to="/password/renew"
                    variant="secondary"
                    size="sm"
                  >
                    Change password
                  </Button>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                initial={{ y: -100, opacity: 0 }}
                className={clsx(styles.slider)}
              >
                <div className={clsx(styles.group)}>
                  <div className="d-flex justify-content-between py-3">
                    <div className="fw-bold">Recent group</div>
                    <Button size="sm" as={Link} to="/home">
                      Show all
                    </Button>
                  </div>
                  <Carousel className={styles.gallery}>
                    {mygroups.map((group) => {
                      return (
                        <Carousel.Item
                          as={Link}
                          to={`/group/${group.id}`}
                          key={group.id}
                          className={clsx(styles.gallery_item)}
                        >
                          <img
                            referrerPolicy="no-referrer"
                            className={styles.img_gr}
                            src={avt}
                            alt="Second slide"
                          />

                          <Carousel.Caption className={clsx(styles.slide_info)}>
                            <h3>{group.groupName}</h3>
                            <p>{group.description}</p>
                          </Carousel.Caption>
                        </Carousel.Item>
                      );
                    })}
                  </Carousel>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
