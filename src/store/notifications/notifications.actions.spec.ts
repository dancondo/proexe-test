import { NotificationCreators, NotificationTypes } from './notifications.actions';

const mockNotification = {
  id: 1,
  type: 'sucess',
  title: 'Notification',
  message: 'Success???',
}

describe('Notifications Actions', () => {

  describe('SHOW_NOTIFICATION', () => {
    it('show notification should return the expected action', () => {
      expect(NotificationCreators.showNotification()).toEqual({
        type: NotificationTypes.SHOW_NOTIFICATION
      });
    });
  
    it('show notification should return the expected action with a notification', () => {
      expect(NotificationCreators.showNotification(mockNotification)).toEqual({
        type: NotificationTypes.SHOW_NOTIFICATION,
        notification: mockNotification
      });
    });
  })

  describe('CLOSE_NOTIFICATION', () => {
    it('close notification should return the expected action', () => {
      expect(NotificationCreators.closeNotification()).toEqual({
        type: NotificationTypes.CLOSE_NOTIFICATION
      });
    });
  
    it('close notification should return the expected action with a notificationId', () => {
      expect(NotificationCreators.closeNotification(mockNotification.id)).toEqual({
        type: NotificationTypes.CLOSE_NOTIFICATION,
        notificationId: mockNotification.id
      });
    });
  })

})