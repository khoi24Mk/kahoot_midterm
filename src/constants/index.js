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
  // general
  joinRoom: 'JOIN_ROOM',
  leaveRoom: 'LEAVE_ROOM',
  chat: 'CHAT',

  // host
  start: 'START',
  end: 'END',
  nextSlide: 'NEXT_SLIDE',
  prevSlide: 'PREV_SLIDE',
  answerQuestion: 'ANSWER_QUESTION',

  // member
  voteSlide: 'VOTE_SLIDE',
  askQuestion: 'ASK_QUESTION',
};

const ServerMessageType = {
  presentedSlide: 'PRESENTED_SLIDE',
  updatedSlide: 'UPDATED_SLIDE',

  askedQuestion: 'ASKED_QUESTION',
  answeredQuestion: 'ANSWERED_QUESTION',
  chat: 'CHAT',
  joinRoom: 'JOIN_ROOM',
  leaveRoom: 'LEAVE_ROOM',
};

const ClientType = {
  host: 'HOST',
  member: 'MEMBER',
};

const SlideType = {
  multipleChoie: 'MULTIPLE_CHOICE',
  heading: 'HEADING',
  paragraph: 'PARAGRAPH',
};

const Constant = {
  BackEnd,
  GoogleClientId,
  SocketURL,
  ClientMessageType,
  ServerMessageType,
  ClientType,
  SlideType,
};
export default Constant;
