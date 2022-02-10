import { createReducer } from 'reduxsauce'
import { SuccessUpsertUserAction, FailedRequestAction, SuccessGetUsersAction, UserTypes, SuccessGetUserDetailsAction, UserIdBasedAction } from './users.actions'

interface UserState {
  users: UserDto[];
  loading: boolean;
  fetched: boolean;
  error: string | null;
  userDetails?: UserDto;

}

export const INITIAL_STATE: UserState = {
  users: [],
  error: null,
  fetched: false,
  loading: false,
  userDetails: undefined,
}

export const startRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    error: null,
    loading: true,
  }
}

export const failedRequest = (state = INITIAL_STATE, action: FailedRequestAction) => {
  return {
    ...state,
    users: [],
    loading: false,
    error: action.error,
  }
}

export const successGetUsers = (state = INITIAL_STATE, action: SuccessGetUsersAction) => {
  return {
    ...state,
    fetched: true,
    loading: false,
    users: action.users,
  }
}

export const successGetUserDetails = (state = INITIAL_STATE, action: SuccessGetUserDetailsAction) => {
  return {
    ...state,
    loading: false,
    userDetails: action.userDetails
  }
}

export const createUser = (state = INITIAL_STATE, action: SuccessUpsertUserAction) => {
  const lastUserId = state.users.reduce((lastId, current) => {
    if (current.id === action.user.id || current.id > lastId) {
      return lastId + 1
    }
    return lastId
  }, action.user.id)
  return {
    ...state,
    users: [
      ...state.users,
      {
        ...action.user,
        id: lastUserId
      }
    ]
  }
}

export const updateUser = (state = INITIAL_STATE, action: SuccessUpsertUserAction) => {
  const users = state.users.reduce((arr, user) => {
    if (user.id === action.user.id) {
      arr.push({
        ...user,
        ...action.user
      })
    } else {
      arr.push(user)
    }

    return arr
  }, [] as UserDto[])

  return {
    ...state,
    users,
  }
}

export const deleteUser = (state = INITIAL_STATE, action: UserIdBasedAction) => {
  const users = state.users.filter(user => user.id !== action.userId)

  return {
    ...state,
    users,
  }
}

export const HANDLERS = {
  [UserTypes.START_REQUEST]: startRequest,
  [UserTypes.FAILED_REQUEST]: failedRequest,
  [UserTypes.SUCCESS_GET_USERS]: successGetUsers,
  [UserTypes.SUCCESS_GET_USER_DETAILS]: successGetUserDetails,
  [UserTypes.CREATE_USER]: createUser,
  [UserTypes.UPDATE_USER]: updateUser, 
  [UserTypes.DELETE_USER]: deleteUser,
}

export default createReducer(INITIAL_STATE, HANDLERS)