import React, { useContext } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { AuthContext } from '~/Context';

const renderTooltip = (props, time) => {
  return (
    <Tooltip id="button-tooltip" {...props}>
      {time}
    </Tooltip>
  );
};

export default function ChatItem({ chat }) {
  const { profile } = useContext(AuthContext);
  const fromMe = profile?.id === chat?.user?.id;
  const avatar = chat?.user?.avatar || '/defaultAvatar.png';
  return (
    <div
      className={`d-flex flex-row justify-content-${
        fromMe ? 'end' : 'start'
      } align-items-center mb-4`}
    >
      {!fromMe && (
        <img
          referrerPolicy="no-referrer"
          className="rounded-circle shadow"
          src={avatar}
          alt="avatar 1"
          style={{ width: '45px', height: '45px' }}
        />
      )}
      <div>
        {!fromMe && (
          <p
            style={{
              fontSize: '0.8rem',
              paddingLeft: '10px',
              fontWeight: 'bold',
              color: 'gray',
            }}
            className="m-0 ms-3"
          >
            {chat?.user?.displayName}
          </p>
        )}
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 0, hide: 0 }}
          overlay={(props) =>
            renderTooltip(
              props,
              new Date(chat?.dateCreated).toLocaleString('en-US')
            )
          }
        >
          <div
            className="p-3 me-3 ms-3 border"
            style={{
              borderRadius: '15px',
              backgroundColor: `${
                fromMe ? '#fbfbfb' : 'rgba(57, 192, 237,.2)'
              }`,
            }}
          >
            <p className="small mb-0">{chat?.content}</p>
          </div>
        </OverlayTrigger>
      </div>
      {fromMe && (
        <img
          referrerPolicy="no-referrer"
          className="rounded-circle shadow"
          src={avatar}
          alt="avatar 1"
          style={{ width: '45px', height: '45px' }}
        />
      )}
    </div>
  );
}
