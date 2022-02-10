import React, { useState } from 'react';

import UserForm from 'components/Users/Form';
import { useAppDispatch } from 'hooks/state.hooks';
import { UserCreators } from 'store/users/users.actions';
import { useNavigate } from 'react-router-dom';
import UsersLayout from 'layouts/UsersLayout';
import { createUser } from 'store/users/users.services';
import { NotificationCreators } from 'store/notifications/notifications.actions';

const CreateUserPage: React.FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (userDto: UpsertUserDto) => {
    try {
      setLoading(true)
      const user = await createUser(userDto)
      dispatch(UserCreators.createUser(user))
      dispatch(NotificationCreators.showNotification({
        timeout: 5000,
        type: 'success',
        title: 'User Created',
        message: 'A new user was added to the list!',
      }))
      navigate('/users')
    } catch (err) {
      dispatch(NotificationCreators.showNotification({
        message: err,
        timeout: 5000,
        type: 'danger',
        title: 'Create user error!',
      }))
    } finally {
      setLoading(false)
    }

  }

  const onCancel = () => {
    navigate('/users')
  }

  return (
    <UsersLayout
      title="Create User"
    >
      <UserForm
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </UsersLayout>
  )
}

export default CreateUserPage;