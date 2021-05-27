export const GET_EMAIL_REGISTERED = "GET_EMAIL_REGISTERED";
export const GET_PASS_REGISTERED = "GET_PASS_REGISTERED";
export const IS_AUTH = "IS_AUTH";

export const getEmailRegistered = ( get_Email_Registered) => ({ type: GET_EMAIL_REGISTERED, get_Email_Registered});
export const getPassRegistered = (get_Pass_Registered) => ({ type: GET_PASS_REGISTERED, get_Pass_Registered});
export const isAuth = ( is_Auth) => ({ type: IS_AUTH, is_Auth});
