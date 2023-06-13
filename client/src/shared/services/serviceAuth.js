import { CHECK_AUTH_URL, SIGN_IN_URL, SIGN_OUT_URL, SIGN_UP_URL } from "../constant/constant";
import { getApi, postApi } from "./services";

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

const fetchSignOut = async() => {
    try {
        const res = await postApi(SIGN_OUT_URL);
        return res;
    } catch (err) {
        throw err.response;
    }
}

const fetchCheckAuth = async() => {
    try {
        const res = await getApi(CHECK_AUTH_URL);
        console.log(res);
        return res;
    } catch (err) {
        throw err.response;
    }
}
export { fetchSignIn, fetchSignUp, fetchSignOut, fetchCheckAuth }