import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import applicationReducer from './applicationReducers';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  application: applicationReducer
});