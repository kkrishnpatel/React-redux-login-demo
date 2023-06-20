import React, { Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Logout = React.lazy(() => import('./pages/Logout'));

import { SignUp } from './pages/SignUp';
import { PrivateRoutes } from './utils/privateRoutes';
import { Layout } from './reusable/Layout';

import './App.css';
import history from './utils/history';




const App = () => {
  return (
    <div className="App">
      <HistoryRouter history={history}>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Layout><Home /></Layout>} path="/home" />
            <Route element={<Layout><Profile /></Layout>} path="/profile" />
            <Route element={<Layout><Logout /></Layout>} path="/logout" />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Route>
          <Route element={<SignUp />} path="/login" />
          <Route element={<SignUp />} path="/register" />
        </Routes>
      </HistoryRouter>
    </div>
  );
}

export default App;
