import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const renderTooltip = (props, time) => {
  return (
    <Tooltip id="button-tooltip" {...props}>
      {time}
    </Tooltip>
  );
};

export default function ChatItem({ content, avatar, fromMe, time, name }) {
  return (
    <div
      className={`d-flex flex-row justify-content-${
        fromMe ? 'end' : 'start'
      } mb-4`}
    >
      {!fromMe && (
        <img
          src={avatar}
          alt="avatar 1"
          style={{ width: '45px', height: '100%' }}
        />
      )}
      <div>
        {!fromMe && (
          <p
            style={{
              fontSize: '0.8rem',
              margin: 0,
              paddingLeft: '10px',
              fontWeight: 'bold',
              color: 'gray',
            }}
          >
            {name}
          </p>
        )}
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={(props) => renderTooltip(props, time)}
        >
          <div
            className="p-3 me-3 border"
            style={{
              borderRadius: '15px',
              backgroundColor: `${
                fromMe ? '#fbfbfb' : 'rgba(57, 192, 237,.2)'
              }`,
            }}
          >
            <p className="small mb-0">{content}</p>
          </div>
        </OverlayTrigger>
      </div>
      {fromMe && (
        <img
          src={avatar}
          alt="avatar 1"
          style={{ width: '45px', height: '100%' }}
        />
      )}
    </div>
  );
}
