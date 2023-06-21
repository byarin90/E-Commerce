//?All Url from backend server API ROUTES


//?BASE URL
const API_URL = 'http://localhost:3001/';
export const ERROR_AUTH = "MW401";

//?AUTH URL
export const SIGN_UP_URL = API_URL + 'users';
export const SIGN_IN_URL = API_URL + 'users/login';
export const MY_INFO_URL = API_URL + 'users/myInfo';
export const SIGN_OUT_URL = API_URL + 'users/logout';
export const CHECK_AUTH_URL = API_URL + 'users/protected';