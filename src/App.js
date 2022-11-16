/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DefaultLayout from '~/components/Layouts/DefaultLayout';
import { publicRouters, privateRouters } from '~/router';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRouters.map((page) => {
            const Page = page.element;
            let Layout = DefaultLayout;
            if (page.layout === null) {
              Layout = Fragment;
            } else if (page.layout) {
              Layout = page.layout;
            }
            return (
              <Route
                path={page.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
