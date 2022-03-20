import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const axiosPetition = async (endpoint, data = {}, method = "GET") => {
    let result = undefined;

    const options = {
        method,
        url: `${baseUrl}${endpoint}`,
        headers: {
            "Content-Type": "application/json"
        },
        data
    };

    await axios
        .request(options)
        .then(function (response) {
            const { data } = response;
            result = data;
        })
        .catch(function (error) {
            result = error;
        });

    return result;
};

export { axiosPetition };