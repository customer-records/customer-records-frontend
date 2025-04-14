import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ClientPage from './components/clientPage';
import CustomerRecord from './components/customerRecord';
import RegistrationClient from './components/registrationClient';
import AuthClient from './components/authClient';
import RegistrationWorker from './components/registrationWorker';
import AuthWorker from './components/authWorker';
import AdminPanel from './components/adminPanel';
import 'normalize.css';
function App() {
  const [type, setType] = useState('auth'); // Для переключения между регистрацией и авторизацией
  const [user, setUser] = useState(() => {
    // Восстанавливаем данные пользователя из localStorage при загрузке приложения
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Проверяем, есть ли user в localStorage
  const isAuthenticated = !!user;

  // Сохраняем данные пользователя в localStorage при изменении user
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Обработчик выхода
  const handleLogout = () => {
    setUser(null); // Удаляем данные пользователя
    localStorage.removeItem('user'); // Очищаем localStorage
  };

  return (
    <Router>
      
        <Routes>
          {/* Маршрут для авторизации */}
          <Route
            path="/admin/registration"
            element={<RegistrationWorker/>}
          />
          <Route
            path="/admin/login"
            element={<AuthWorker/>}
          />
          <Route
            path="/admin/login"
            element={
              // Если пользователь уже авторизован, перенаправляем на /welcome
              isAuthenticated ? (
                <Navigate to="/admin" replace />
              ) : (
                <Navigate to="/admin/registration" replace />
              )
            }
          />
          {/* Маршрут для страницы приветствия */}
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

          {/* Маршрут авторизации клиента */}
          <Route
            path="/client/login"
            element={<AuthClient/>}
          />
          {/* Маршрут регистрации клиента */}
          <Route
            path="/client/registration"
            element={<RegistrationClient/>}
          />
          {/* Маршрут для страницы клиента */}
          <Route
            path="/client"
            element={<ClientPage />}
          />
          <Route 
          path="/client/:step" 
          element={<CustomerRecord/>} />
          {/* Перенаправление по умолчанию */}
        </Routes>
      
    </Router>
  );
}

export default App;