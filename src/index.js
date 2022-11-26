/* eslint-disable import/order */

/* eslint-disable no-unused-vars */

/* eslint-disable import/extensions */

/* eslint-disable import/no-unresolved */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React from 'react';

import ReactDOM from 'react-dom';

import App from '~/App';

import GlobalStyle from '~/components/GlobalStyle';

import Context from '~/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Context>
      <GlobalStyle>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </GlobalStyle>
    </Context>
  </React.StrictMode>
);
