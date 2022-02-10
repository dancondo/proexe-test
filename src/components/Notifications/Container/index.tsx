import React from 'react';
import ReactDOM from 'react-dom';

import { ToastContainer } from 'react-bootstrap';
import { ToastPosition } from 'react-bootstrap/esm/ToastContainer';
import { useAppSelector } from 'hooks/state.hooks';
import NotificationMessage from '../Message';

interface NotificationContainerProps {
  position?: ToastPosition;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  position = 'top-end'
}) => {
  const notificationContainer = document.getElementById('notifications');
  const notifications = useAppSelector(state => state.notifications.notifications)

  return !!notificationContainer ? ReactDOM.createPortal(
    <ToastContainer
      className="pa5"
      position={position}
      style={{ maxWidth: 358, zIndex: 9999 }}
    >
      {
        notifications.map(notification => (
          <NotificationMessage
            key={notification.id}
            {...notification}
          />
        ))
      }
    </ToastContainer>,
    notificationContainer
  ) : null
}

export default NotificationContainer;
