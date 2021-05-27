import { combineReducers } from "redux";
import { RegisterUserReducer } from "./RegisterUserReducer";
import { RegisteredUsersReducer } from "./RegisteredUsersReducer";
import { AdminReducer } from "./AdminReducer";
import { CartReducer } from "./CartReducer";

const rootReducer = combineReducers({
  CartReducer,
  AdminReducer,
  RegisteredUsersReducer,
  RegisterUserReducer,
});

export default rootReducer;
