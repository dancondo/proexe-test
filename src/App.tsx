import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UsersPage from 'pages/Users';
import EditUserPage from 'pages/EditUser';
import CreateUserPage from 'pages/CreateUser';

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
      </Routes>
    </div>
  );
}

export default App;
