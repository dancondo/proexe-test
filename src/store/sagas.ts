import { fork } from "redux-saga/effects";
import userSagas from "./users/users.sagas";

export default function* rootSaga() {
  yield fork(userSagas);
}
