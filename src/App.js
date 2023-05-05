import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';


import { Home } from './Pages/Home';
import { Profile } from './Pages/Profile';
import { SignUp } from './Pages/SignUp';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Layout } from './Reusable/Layout';
import { Logout } from './Pages/Logout';

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
