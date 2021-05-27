export const GET_NAME_REGISTER = "GET_NAME_REGISTER";
export const GET_EMAIL_REGISTER = "GET_EMAIL_REGISTER";
export const GET_PWD_REGISTER = "GET_PWD_REGISTER";
export const IS_REGISTERING = "IS_REGISTERING";

export const getNameRegister = (get_Name_Register) => ({ type: GET_NAME_REGISTER, get_Name_Register });
export const getEmailRegister = (get_Email_Register) => ({ type: GET_EMAIL_REGISTER, get_Email_Register });
export const getPwdRegister = (get_Pwd_Register) => ({ type: GET_PWD_REGISTER, get_Pwd_Register });
export const isRegistering = (is_Registering) => ({ type: IS_REGISTERING, is_Registering });
