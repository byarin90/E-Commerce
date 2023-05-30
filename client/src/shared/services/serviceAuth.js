import { SIGN_IN_URL, SIGN_UP_URL } from "../constant/constant";
import { postApi } from "./services";

//?AUTH SERVICES

//?SIGN UP
const fetchSignUp = async(bodyData) => {
    try {
        const res = await postApi(SIGN_UP_URL, bodyData);
        return res;
    } catch (err) {
        throw err.response;
    }
}

//?SIGN IN
const fetchSignIn = async(bodyData) => {
    try {
        const res = await postApi(SIGN_IN_URL, bodyData);
        return res;
    } catch (err) {
        throw err.response;
    }
}

export { fetchSignIn, fetchSignUp }