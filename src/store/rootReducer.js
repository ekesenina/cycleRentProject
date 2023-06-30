import { combineReducers } from "redux";
import { casesReducer } from "./Reducers/casesReducer";
import { officersReducer } from "./Reducers/officersReducer";
import { authorizationReducer } from "./Reducers/authorizationReducer";

export const rootReducer = combineReducers({
  casesReducer,
  officersReducer,
  authorizationReducer,
});