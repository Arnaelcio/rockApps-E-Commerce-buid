import {
  GET_EMAIL_REGISTERED,
  GET_PASS_REGISTERED,
  IS_AUTH,
} from "../actions/RegisteredUserAction";

const INITIAL_STATE = {
  email_Registrado: "",
  pass_Registrada: "",
  is_Auth: false,
};
export function RegisteredUsersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_AUTH:
      return { ...state, is_Auth: !state.is_Auth };
    case GET_EMAIL_REGISTERED:
      return { ...state, email_Registrado: action.get_Email_Registered };
    case GET_PASS_REGISTERED:
      return { ...state, pass_Registrada: action.get_Pass_Registered };
    default:
      return state;
  }
}
