import { call, put, select, takeLatest } from 'redux-saga/effects'
import { UserCreators, UserIdBasedAction, UserTypes } from 'store/users/users.actions';
import { getUser, getUsers } from 'store/users/users.services';
import getErrorMessage from 'utils/get-error-message';

export function* getUsersSaga() {
  try {
    yield put(UserCreators.startRequest())
    const users: UserDto[] = yield call(getUsers)
    yield put(UserCreators.successGetUsers(users))
  } catch (err: any) {
    yield put(UserCreators.failedRequest(getErrorMessage(err)))
  }
}

export function* getUserDetailsSaga(action: SagaAction<UserIdBasedAction>) {
  try {
    yield put(UserCreators.startRequest())
    const user: UserDto = yield call(getUser, action.userId)
    yield put(UserCreators.successGetUserDetails(user))
  } catch (err: any) {
    if (err?.response?.status === 404) {
      const localUsers: UserDto[] = yield select(state => state.users.users)
      const localUser = localUsers.find(local => local.id === +action.userId)

      if (!localUser) {
        yield put(UserCreators.failedRequest(getErrorMessage(err)))
        return
      }

      yield put(UserCreators.successGetUserDetails(localUser))
    } else {
      yield put(UserCreators.failedRequest(getErrorMessage(err)))
    }
  }
}

function* userSagas() {
  yield takeLatest(UserTypes.GET_USERS, getUsersSaga)
  yield takeLatest(UserTypes.GET_USER_DETAILS, getUserDetailsSaga)
}

export default userSagas;