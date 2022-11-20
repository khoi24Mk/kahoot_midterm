/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/order */
/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
import clsx from 'clsx';
import styles from './profile.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

import { avt } from '~/img';

function Profile() {
  return (
    <div className={clsx(styles.containter)}>
      <div className={clsx(styles.header)}>
        <div className={clsx(styles.avt_frame)}>
          <img src={avt} className={clsx(styles.avt)} />
        </div>
      </div>
      <div className={clsx(styles.body)}>
        <div className={clsx(styles.overview)}>
          {/* <button className={clsx(styles.edit_btn)}>Edit profile</button> */}
          <Button className={clsx(styles.edit_btn)} variant="outline-primary">
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
        </div>
        <div className={clsx(styles.info)}>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Name</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>
          </Form>
        </div>
        <div className={clsx(styles.group)}>
          <Carousel>
            <Carousel.Item>
              <img className="d-block w-30" src={avt} alt="Second slide" />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
              <img className="d-block w-30" src={avt} alt="Second slide" />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="d-block w-30" src={avt} alt="Second slide" />

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
