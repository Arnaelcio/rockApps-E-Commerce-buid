export const GET_USER = "GET_USER";
export const GET_PASS = "GET_PASS";

export const getUserAdmin = ( get_User_Admin) => ({ type: GET_USER, get_User_Admin});
export const getPassAdmin = (get_Pass_Admin) => ({ type: GET_PASS, get_Pass_Admin});
