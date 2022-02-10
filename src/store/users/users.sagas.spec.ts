import { runSaga } from 'redux-saga';
import { getUserDetailsSaga, getUsersSaga } from './users.sagas'
import * as userServices from './users.services'
import { UserCreators } from './users.actions';

const mockUser = {
  id: 1,
  name: 'John Coltrane',
  username: 'john.coltrane',
  email: 'john@coltrane.com',
}

const mockUsers = [mockUser]

const mockError = 'Error!'

describe('Users Sagas', () => {

  describe('Get Users Saga', () => {
    it('should call service and dispatch successfull action', async () => {
      const requestUsers = jest.spyOn(userServices, 'getUsers')
        .mockImplementation(() => Promise.resolve(mockUsers));

      const actions = [];

      await runSaga({
        dispatch: (action) => actions.push(action),
      }, getUsersSaga)

      expect(requestUsers).toHaveBeenCalledTimes(1);
      expect(actions).toEqual([
        UserCreators.startRequest(),
        UserCreators.successGetUsers(mockUsers)
      ]);

      requestUsers.mockClear();
    })

    it('should call service and dispatch failure action in case of error', async () => {
      const requestUsers = jest.spyOn(userServices, 'getUsers')
        .mockImplementation(() => Promise.reject(new Error(mockError)))

      const actions = [];

      await runSaga({
        dispatch: (action) => actions.push(action),
      }, getUsersSaga)

      expect(requestUsers).toHaveBeenCalledTimes(1);
      expect(actions).toEqual([
        UserCreators.startRequest(),
        UserCreators.failedRequest(mockError)
      ]);

      requestUsers.mockClear();
    })

  })

  describe('Get User Details Saga', () => {
    it('should call service and dispatch successfull action', async () => {
      const requestUser = jest.spyOn(userServices, 'getUser')
        .mockImplementation(() => Promise.resolve(mockUser));

      const actions = [];

      await runSaga({
        dispatch: (action) => actions.push(action),
      }, getUserDetailsSaga, mockUser.id)

      expect(requestUser).toHaveBeenCalledTimes(1);
      expect(actions).toEqual([
        UserCreators.startRequest(),
        UserCreators.successGetUserDetails(mockUser)
      ]);

      requestUser.mockClear();
    })

    it('should call service and dispatch failure action in case of error', async () => {
      const requestUser = jest.spyOn(userServices, 'getUser')
        .mockImplementation(() => Promise.reject(new Error(mockError)))

      const actions = [];

      await runSaga({
        dispatch: (action) => actions.push(action),
      }, getUserDetailsSaga, 0)

      expect(requestUser).toHaveBeenCalledTimes(1);

      expect(actions).toEqual([
        UserCreators.startRequest(),
        UserCreators.failedRequest(mockError)
      ]);

      requestUser.mockClear();
    })

  })

})