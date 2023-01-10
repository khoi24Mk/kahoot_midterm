import { useContext, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import Constant from '~/constants';
import { AuthContext } from '~/Context';

export default function PrivateLayout() {
  const context = useContext(AuthContext);
  const { profile, setProfile } = context;
  const unAuthenticated = profile === null || profile === undefined;
  const { pathname, search } = useLocation();
  useEffect(() => {
    if (
      !localStorage.getItem('access_token') &&
      !localStorage.getItem('refresh_token')
    ) {
      setProfile(null);
    }
  }, [pathname]);

  // connect socket
  const { sendMessage } = useWebSocket(Constant.SocketURL, {
    onOpen: () => {
      console.log('Open socket');
    },
    onClose: () => {
      console.log('Close socket');
    },
    onError: () => {
      console.log('Error socket');
    },
    shouldReconnect: () => true,
    share: true,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      sendMessage(
        JSON.stringify({
          metaData: {
            roomName: 'pingPong',
            clientType: Constant.ClientType.member,
            messageType: Constant.ClientMessageType.joinRoom,
          },
          message: null,
        })
      );
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  });

  return unAuthenticated ? (
    <Navigate
      to="/notAuthentication"
      state={{
        redirectUrl: pathname,
        search,
      }}
      replace
    />
  ) : (
    <Outlet />
  );
}
