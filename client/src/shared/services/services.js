import axios from "axios";
//?Service for API calls using axios for every request(GET, POST, PUT, DELETE)

export const getApi = async(url) => {

    try {
        const res = await axios({
            method: 'GET',
            url: url,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const postApi = async(url, bodyData) => {
    try {
        const res = await axios({
            method: 'POST',
            url: url,
            data: bodyData,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const putApi = async(url, bodyData) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: url,
            data: bodyData,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}

export const deleteApi = async(url) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: url,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return res;
    } catch (error) {
        // console.log(error);
        throw error;
    }
}