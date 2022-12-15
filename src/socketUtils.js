const getRawSocketMessage = (object) => {
  return JSON.stringify(object);
};
const socketUtilActions = { getRawSocketMessage };
export default socketUtilActions;
