import { createActions } from 'reduxsauce'

export interface ShowNotificationAction {
  notification: CreateNotificationDto
}

export interface CloseNotificationAction {
  notificationId: number;
}

const { Types, Creators } = createActions({
  showNotification: ['notification'],
  closeNotification: ['notificationId'],
}, { prefix: 'notifications' })

export {
  Types as NotificationTypes,
  Creators as NotificationCreators
}
