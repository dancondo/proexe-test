import { createActions } from 'reduxsauce'

export interface FailedRequestAction {
  error: string;
}

export interface SuccessGetUsersAction {
  users: UserDto[];
}

export interface UserIdBasedAction {
  userId: number;
}

export interface SuccessGetUserDetailsAction {
  userDetails: UserDto;
}

export interface CreateUserAction {
  user: UpsertUserDto;
}

export interface UpdateUserAction extends CreateUserAction, UserIdBasedAction {}

export interface SuccessUpsertUserAction {
  user: UserDto;
}


const { Types, Creators } = createActions({
  // GENERIC
  startRequest: [],
  failedRequest: ['error'],
  // GET
  getUsers: [],
  successGetUsers: ['users'],
  getUserDetails: ['userId'],
  successGetUserDetails: ['userDetails'],
  // CREATE
  createUser: ['user'],
  // UPDATE
  updateUser: ['user'],
  // DELETE
  deleteUser: ['userId']
}, { prefix: 'users' })

export {
  Types as UserTypes,
  Creators as UserCreators
}
