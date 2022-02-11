import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UsersPage from 'pages/Users';
import EditUserPage from 'pages/EditUser';
import CreateUserPage from 'pages/CreateUser';
import NotFoundPage from 'pages/NotFound';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path=""
          element={<UsersPage />}
        />
        <Route
          path="users/create"
          element={<CreateUserPage />}
        />
        <Route
          path="users/:userId/edit"
          element={<EditUserPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
