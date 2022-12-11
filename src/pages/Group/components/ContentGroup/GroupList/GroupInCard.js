// import { MdDateRange, MdOutlineReport, MdPersonRemove } from 'react-icons/md';
// import { useNavigate } from 'react-router-dom';
// import './style.scss';
// import { groupBg } from '~/img';

// function GroupInCard({ groupId, groupName, owner, description }) {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <ul>
//         <div
//           className="booking-card"
//           style={{
//             backgroundImage: `url(${groupBg})`,
//           }}
//         >
//           <div className="book-container">
//             <div className="content">
//               <button
//                 type="button"
//                 onClick={() => {
//                   navigate(`/group/${groupId}`);
//                 }}
//                 className="btn"
//               >
//                 Detail
//               </button>
//             </div>
//           </div>
//           <div className="informations-container">
//             <h2 className="title">{groupName}</h2>
//             <p className="sub-title">{owner.displayName}</p>
//             <p className="price">
//               <MdDateRange size={25} />
//               Start Date
//             </p>
//             <div className="more-information">
//               <div className="info-and-date-container">
//                 <div className="box info">
//                   <MdOutlineReport size={30} />
//                   <p>Report</p>
//                 </div>
//                 <div className="box date">
//                   <MdPersonRemove size={30} />
//                   <p>Unenroll</p>
//                 </div>
//               </div>
//               <p className="disclaimer">{description}</p>
//             </div>
//           </div>
//         </div>
//       </ul>
//     </div>
//   );
// }

// export default GroupInCard;

import { forwardRef } from 'react';
import { Dropdown } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { groupBg } from '~/img';
import styles from './groupList.module.css';

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
      <Dropdown className={clsx(styles.dropdown)}>
        <Dropdown.Toggle as={CustomToggle} />
        <Dropdown.Menu className={clsx(styles.dropdown_menu)}>
          <Dropdown.Item>Move</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Unenroll</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Card.Img
        role="button"
        variant="top"
        src={groupBg}
        style={{
          minHeight: '150px',
        }}
      />

      <Card.ImgOverlay className="text-white fw-light row">
        <div className="col-11">
          <Card.Title
            as={Link}
            to={`/group/${groupId}`}
            className="text-decoration-none text-white fw-bold"
          >
            <p
              style={{
                width: '250px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {groupName}
            </p>
          </Card.Title>
          <Card.Text
            className="text-uppercase"
            style={{
              width: '250px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {owner?.displayName}
          </Card.Text>
        </div>
      </Card.ImgOverlay>

      <Card.Body style={{ minHeight: '150px', position: 'relative' }}>
        <img
          className={clsx(styles.GroupInCard_img)}
          alt=""
          src={owner?.avatar || '/defaultAvatar.png'}
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
