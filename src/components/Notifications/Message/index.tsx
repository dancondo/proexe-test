import React, { useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { NotificationCreators } from 'store/notifications/notifications.actions';

interface NotificationMessageProps extends NotificationDto {

}

const NotificationMessage: React.FC<NotificationMessageProps> = ({
  id,
  type,
  title,
  timeout,
  message,
}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (id && timeout) {
      setTimeout(() => {
        dispatch(NotificationCreators.closeNotification(id))
      }, timeout)
    }
  }, [id, timeout, dispatch])

  const closeNotification = () => {
    dispatch(NotificationCreators.closeNotification(id))
  }

  return (
    <Toast
      bg={type}
      className="d-inline-block m-1"
      onClose={closeNotification}
    >
      <Toast.Header>
        <strong
          className="me-auto"
        >
          {title}
        </strong>
      </Toast.Header>
      <Toast.Body>
        {message}
      </Toast.Body>
    </Toast>
  )
}

export default NotificationMessage;
