import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import React from 'react';

import ReactDOM from 'react-dom';

import App from '~/App';

import GlobalStyle from '~/components/GlobalStyle';

import Context from '~/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

root.render(
  <Context>
    <GlobalStyle>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </GlobalStyle>
  </Context>
);
