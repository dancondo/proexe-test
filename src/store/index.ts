import createSagaMiddleware from "@redux-saga/core";
import { createStore ,combineReducers, applyMiddleware } from "redux";

import rootSaga from "store/sagas";
import usersReducer from "store/users/users.reducer";
import notificationsReducer from "./notifications/notifications.reducer";

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
  users: usersReducer,
  notifications: notificationsReducer,
})

const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store