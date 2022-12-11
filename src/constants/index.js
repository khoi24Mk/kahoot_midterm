const BackEnd =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/api/v1'
    : process.env.REACT_APP_BACKEND;
const GoogleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const SocketURL =
  process.env.NODE_ENV === 'development'
    ? 'ws://localhost:8080/socket'
    : process.env.REACT_APP_SOCKET_URL;
const ClientMessageType = {
  joinRoom: 'JOIN_ROOM',
  leaveRoom: 'LEAVE_ROOM',
  presentSlide: 'PRESENT_SLIDE',
  voteSlide: 'VOTE_SLIDE',
};

const ServerMessageType = {
  presentedSlide: 'PRESENTED_SLIDE',
  updatedSlide: 'UPDATED_SLIDE',
};

const ClientType = {
  host: 'HOST',
  member: 'MEMBER',
};

const Constant = {
  BackEnd,
  GoogleClientId,
  SocketURL,
  ClientMessageType,
  ServerMessageType,
  ClientType,
};
export default Constant;
