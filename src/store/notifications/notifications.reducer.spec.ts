import { NotificationCreators } from './notifications.actions';
import notificationsReducer, { INITIAL_STATE } from './notifications.reducer';

const mockNotification = {
  id: 1,
  type: 'sucess',
  title: 'Notification',
  message: 'Success???',
}

describe('Notifications reducer', () => {
  test('should return the initial state', () => {
    expect(notificationsReducer(undefined, { type: '' })).toEqual(INITIAL_STATE)
  })
  
  test('should handle show notification', () => {
    const previousState = INITIAL_STATE
    expect(
      notificationsReducer(previousState, NotificationCreators.showNotification(mockNotification))
    ).toEqual({
      ...previousState,
      notifications: [mockNotification]
    })
  })
  
  test('should delete an user', () => {
    const previousState = { ...INITIAL_STATE, notifications: [mockNotification] }
    expect(
      notificationsReducer(previousState, NotificationCreators.closeNotification(mockNotification.id))
    ).toEqual({
      ...previousState,
      notifications: []
    })
  })
})
