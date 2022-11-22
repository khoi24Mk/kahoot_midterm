/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from '~/App';
import GlobalStyle from '~/components/GlobalStyle';
import Context from '~/Context';

const domain = process.env.REACT_APP_AUTH_DOMAIN;
const clientId = process.env.REACT_APP_AUTH_CLIENT_ID;
const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();
root.render(
  <React.StrictMode>
    <Context>
      <GlobalStyle>
        <QueryClientProvider client={queryClient}>
          <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
          >
            <App />
          </Auth0Provider>
        </QueryClientProvider>
      </GlobalStyle>
    </Context>
  </React.StrictMode>
);
