import React, { useEffect, useState } from 'react';

import UserForm from 'components/Users/Form';
import { useAppDispatch, useAppSelector } from 'hooks/state.hooks';
import { UserCreators } from 'store/users/users.actions';
import { useNavigate, useParams } from 'react-router-dom';
import UsersLayout from 'layouts/UsersLayout';
import { updateUser } from 'store/users/users.services';
import { NotificationCreators } from 'store/notifications/notifications.actions';
import Panel from 'components/Base/Panel';
import getErrorMessage from 'utils/get-error-message';

const EditUserPage: React.FC = () => {
  const navigate = useNavigate()
  const { userId } = useParams() 
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userId) {
      dispatch(UserCreators.getUserDetails(userId))
    }
  }, [dispatch, userId])

  const user = useAppSelector(state => state.users.userDetails)

  const onSubmit = async (userDto: UpsertUserDto) => {
    if (!userId) {
      return
    }
    try {
      setLoading(true)
      const data = await updateUser(+userId, userDto)
      dispatch(UserCreators.updateUser(data))
      dispatch(NotificationCreators.showNotification({
        timeout: 5000,
        type: 'success',
        title: 'User Updated',
        message: `User #${userId} was updated successfully!`,
      }))
      navigate('/users')
    } catch (err: any) {
      dispatch(NotificationCreators.showNotification({
        timeout: 5000,
        type: 'danger',
        title: 'Edit user error!',
        message: getErrorMessage(err),
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
      title={`Edit User #${userId}`}
    >
      {
        !user && (
          <Panel>
            <span
              className="display-6 text-center"
            >
              Loading...
            </span>
          </Panel>
        )
      }
      {
        user && (
          <UserForm
            user={user}
            loading={loading}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        )
      }
    </UsersLayout>
  )
}

export default EditUserPage;