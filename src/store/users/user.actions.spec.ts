import { UserCreators, UserTypes } from './users.actions';

const mockError = "Error!!!"

const mockUser = {
  id: 1,
  name: 'John Coltrane',
  username: 'john.coltrane',
  email: 'john@coltrane.com',
}

const mockUsers = [mockUser]

describe('User Actions', () => {

  describe('START_REQUEST', () => {
    it('start should return the expected action', () => {
      expect(UserCreators.startRequest()).toEqual({
        type: UserTypes.START_REQUEST
      });
    });
  })

  describe('FAILED_REQUEST', () => {
    it('failed request should return the expected action', () => {
      expect(UserCreators.failedRequest()).toEqual({
        type: UserTypes.FAILED_REQUEST
      });
    });
  
    it('failed requesy should return the expected action with an error', () => {
      expect(UserCreators.failedRequest(mockError)).toEqual({
        type: UserTypes.FAILED_REQUEST,
        error: mockError
      });
    });
  })

  describe('GET_USERS', () => {
    it('get users should return the expected action', () => {
      expect(UserCreators.getUsers()).toEqual({
        type: UserTypes.GET_USERS
      });
    });
  })

  describe('SUCCESS_GET_USERS', () => {
    it('success get users should return the expected action', () => {
      expect(UserCreators.successGetUsers()).toEqual({
        type: UserTypes.SUCCESS_GET_USERS
      });
    });
  
    it('success get users  should return the expected action with an error', () => {
      expect(UserCreators.successGetUsers(mockUsers)).toEqual({
        type: UserTypes.SUCCESS_GET_USERS,
        users: mockUsers
      });
    });
  })

  describe('GET_USER_DETAILS', () => {
    it('get user details should return the expected action', () => {
      expect(UserCreators.getUserDetails()).toEqual({
        type: UserTypes.GET_USER_DETAILS
      });
    });

    it('get user details should return the expected action with an userId', () => {
      expect(UserCreators.getUserDetails(mockUser.id)).toEqual({
        type: UserTypes.GET_USER_DETAILS,
        userId: mockUser.id
      });
    });
  })

  describe('SUCCESS_GET_USER_DETAILS', () => {
    it('success get user details should return the expected action', () => {
      expect(UserCreators.successGetUserDetails()).toEqual({
        type: UserTypes.SUCCESS_GET_USER_DETAILS
      });
    });
  
    it('success get user details should return the expected action with an user', () => {
      expect(UserCreators.successGetUserDetails(mockUser)).toEqual({
        type: UserTypes.SUCCESS_GET_USER_DETAILS,
        userDetails: mockUser
      });
    });
  })

  describe('CREATE_USER', () => {
    it('create user should return the expected action', () => {
      expect(UserCreators.createUser()).toEqual({
        type: UserTypes.CREATE_USER
      });
    });
  
    it('create user should return the expected action with an user', () => {
      expect(UserCreators.createUser(mockUser)).toEqual({
        type: UserTypes.CREATE_USER,
        user: mockUser
      });
    });
  })

  describe('UPDATE_USER', () => {
    it('update user should return the expected action', () => {
      expect(UserCreators.updateUser()).toEqual({
        type: UserTypes.UPDATE_USER
      });
    });
  
    it('update user should return the expected action with an user', () => {
      expect(UserCreators.updateUser(mockUser)).toEqual({
        type: UserTypes.UPDATE_USER,
        user: mockUser
      });
    });
  })

  describe('DELETE_USER', () => {
    it('delete user should return the expected action', () => {
      expect(UserCreators.deleteUser()).toEqual({
        type: UserTypes.DELETE_USER
      });
    });
  
    it('delete user should return the expected action with an userId', () => {
      expect(UserCreators.deleteUser(mockUser.id)).toEqual({
        type: UserTypes.DELETE_USER,
        userId: mockUser.id
      });
    });
  })

})