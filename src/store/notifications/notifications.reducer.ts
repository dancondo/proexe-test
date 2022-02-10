import { createReducer } from 'reduxsauce'
import { CloseNotificationAction, NotificationTypes, ShowNotificationAction } from './notifications.actions';

interface NotificationsState {
  notifications: NotificationDto[];
}

export const INITIAL_STATE: NotificationsState = {
  notifications: [] as NotificationDto[],
}

export const showNotification = (state = INITIAL_STATE, action: ShowNotificationAction): NotificationsState => {
  return {
    ...state,
    notifications: [
      ...state.notifications,
      {
        ...action.notification,
        id: action.notification.id || Math.round(Math.random() * 10000)
      }
    ]
  }
}

export const closeNotification = (state = INITIAL_STATE, action: CloseNotificationAction): NotificationsState => {
  return {
    ...state,
    notifications: state.notifications.filter(
      notification => notification.id !== action.notificationId
    )
  }
}

export const HANDLERS = {
  [NotificationTypes.SHOW_NOTIFICATION]: showNotification,
  [NotificationTypes.CLOSE_NOTIFICATION]: closeNotification,
}

export default createReducer(INITIAL_STATE, HANDLERS)