import './App.css';
import { useState, useEffect, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientPage from './components/clientPage';
import CustomerRecord from './components/customerRecord';
const RegistrationClient = lazy(() => import('./components/registrationClient'));
const AuthClient = lazy(() => import('./components/authClient'));
const RegistrationWorker = lazy(() => import('./components/registrationWorker'));
const AuthWorker = lazy(() => import('./components/authWorker'));
const AdminPanel = lazy(() => import('./components/adminPanel'));
import 'normalize.css';
import Contacts from './components/UI/contacts/contacts';
import { Box } from '@mui/material';
import Chat from './components/UI/chat/chat';
function App() {
  const [type, setType] = useState('auth');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!user;

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <Box sx={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        // overflow: 'hidden'
      }}>
        <Box sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Routes>
            <Route path="/admin/registration" element={<RegistrationWorker/>} />
            <Route path="/admin/login" element={<AuthWorker/>} />
            <Route
              path="/admin/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/admin" replace />
                ) : (
                  <Navigate to="/admin/registration" replace />
                )
              }
            />
            <Route
              path="/admin"
              element={
                isAuthenticated ? (
                  <AdminPanel />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/client" replace />
                ) : (
                  <Navigate to="/client" replace />
                )
              }
            />
            <Route path='/client/chat' element={<Chat/>}/>
            <Route path="/client/contacts" element={<Contacts/>} />
            <Route path="/client/login" element={<AuthClient/>} />
            <Route path="/client/registration" element={<RegistrationClient/>} />
            <Route path="/client" element={<ClientPage />} />
            <Route path="/client/:step" element={<CustomerRecord/>} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;