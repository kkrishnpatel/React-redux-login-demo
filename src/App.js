import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import { Profile } from './Pages/Profile';
import { SignUp } from './Pages/SignUp';
import { PrivateRoutes } from './utils/PrivateRoutes';
import { Layout } from './Reusable/Layout';
import { Logout } from './Pages/Logout';

const App = () => {
  return (
    <div className="App">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
