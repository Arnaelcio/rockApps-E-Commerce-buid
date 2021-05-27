import { GET_USER, GET_PASS } from "../actions/AdminAction";

const INITIAL_STATE = {
  user_Admin: "",
  pass_Admin: "",
};
export function AdminReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user_Admin: action.get_User_Admin };
    case GET_PASS:
      return { ...state, pass_Admin: action.get_Pass_Admin };
    default:
      return state;
  }
}
