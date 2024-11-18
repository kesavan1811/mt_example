import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import usersReducer from "../reducers/userReducer";

const store = createStore(usersReducer, applyMiddleware(thunk));

export default store;
