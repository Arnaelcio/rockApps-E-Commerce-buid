import {
  IS_REGISTERING,
  GET_NAME_REGISTER,
  GET_PWD_REGISTER,
  GET_EMAIL_REGISTER,
} from "../actions/RegisterUserAction";

const INITIAL_STATE = {
  Nome_Registro: "",
  Email_Registro: "",
  Senha_Registro: "",
  Is_Registering: false,
};
export function RegisterUserReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case IS_REGISTERING:
      return { ...state, Is_Registering: !state.Is_Registering };
    case GET_NAME_REGISTER:
      console.log(action.get_Name_Register);
      return { ...state, Nome_Registro: action.get_Name_Register };
    case GET_EMAIL_REGISTER:
      return { ...state, Email_Registro: action.get_Email_Register };
    case GET_PWD_REGISTER:
      return { ...state, Senha_Registro: action.get_Pwd_Register };
    default:
      return state;
  }
}
