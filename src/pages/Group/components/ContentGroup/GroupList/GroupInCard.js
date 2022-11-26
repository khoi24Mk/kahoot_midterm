/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
import Card from 'react-bootstrap/Card';
import { Dropdown } from 'react-bootstrap';
import { forwardRef } from 'react';

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ color: '#000', textDecoration: 'none' }}
  >
    {children}
    <span className="threedots" />
  </a>
));

function GroupInCard({ groupId, groupName, owner, description }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        onClick={() => {
          window.location.href = '/group/'.concat(groupId);
        }}
        role="button"
        variant="top"
        src="https://gstatic.com/classroom/themes/img_read.jpg"
      />
      <Card.Body>
        <Card.Header className="d-flex justify-content-between">
          <Card.Title
            onClick={() => {
              window.location.href = '/group/'.concat(groupId);
            }}
            role="button"
            className=""
          >
            {groupName}
          </Card.Title>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} />
            <Dropdown.Menu>
              <Dropdown.Item>Move</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Unenroll</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Card.Header>
        <Card.Title
          onClick={() => {
            window.location.href = '/group/'.concat(groupId);
          }}
          role="button"
        >
          {owner}
        </Card.Title>
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
