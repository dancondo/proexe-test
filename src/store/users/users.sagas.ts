import { call, put, takeLatest } from 'redux-saga/effects'
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
    yield put(UserCreators.failedRequest(getErrorMessage(err)))
  }
}

function* userSagas() {
  yield takeLatest(UserTypes.GET_USERS, getUsersSaga)
  yield takeLatest(UserTypes.GET_USER_DETAILS, getUserDetailsSaga)
}

export default userSagas;