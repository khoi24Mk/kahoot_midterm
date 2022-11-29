import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { groupBg } from '~/img';

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <button
    type="button"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{
      color: 'white',
      textDecoration: 'none',
      outline: 'none',
      border: 'none',
      background: 'transparent',
      fontWeight: 'bold',
    }}
  >
    {children}
    <span className="threedots" />
  </button>
));

function GroupInCard({ groupId, groupName, owner, description }) {
  return (
    <Card style={{ minWidth: '300px' }}>
      <Card.Img
        onClick={() => {
          window.location.href = '/group/'.concat(groupId);
        }}
        role="button"
        variant="top"
        src={groupBg}
        style={{
          minHeight: '100px',
        }}
      />

      <Card.ImgOverlay className="text-white fw-light row">
        <div className="col-11">
          <Card.Title
            as={Link}
            to={`/group/${groupId}`}
            className="text-decoration-none text-white fw-bold"
          >
            {groupName}
          </Card.Title>
          <Card.Text className="text-uppercase">{owner?.displayName}</Card.Text>
        </div>

        <Dropdown className="col-1">
          <Dropdown.Toggle as={CustomToggle} />
          <Dropdown.Menu>
            <Dropdown.Item>Move</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>Unenroll</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.ImgOverlay>

      <Card.Body style={{ minHeight: '150px', position: 'relative' }}>
        <img
          style={{
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            position: 'absolute',
            right: '10px',
            top: '-40px',
            border: 'solid 1px',
            borderRadius: '50%',
          }}
          alt=""
          src={
            owner?.avatar ||
            'https://cdn5.vectorstock.com/i/1000x1000/78/59/happy-grin-emoji-instant-messaging-icon-imag-vector-17067859.jpg'
          }
        />
        <Card.Subtitle
          onClick={() => {
            window.location.href = '/group/'.concat(groupId);
          }}
          role="button"
        >
          {description}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

export default GroupInCard;
