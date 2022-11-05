import axios from 'axios';

const { 
    REACT_APP_AUTH_API_URL,
    REACT_APP_SIGNUP_API_URL
} = process.env;

const PATH = '/api/';


const authApi = {
    
    login: async (email, password, cancelToken) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_AUTH_API_URL + PATH;

        const getResult = await axios.post(
            URL + 'login',
            {
                email: email,
                password: password,
                scope: 'admin',
                grant_type: 'password',
                device_id: '',
                device_manufacturer: '',
                device_platform: '',
                device_model: ''
            },
            {
                cancelToken: cancelToken,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch( error => {
                try {
                    status = error.response.status;

                    if (error.response) {
                        // Request made and server responded
                        errorMessage = error.response.data;
                    } else if (error.request) {
                        // The request was made but no response was received
                        errorMessage = error.request;
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        errorMessage = error.message;
                    }
                } catch(err) {
                    errorMessage = 'Service Unavailable!'
                }
            });
        return { data: getResult, errorMessage: errorMessage, status: status};
    },

    refreshToken: async (refresh_token) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_AUTH_API_URL + PATH;

        const getResult = await axios.post(
            URL + 'oauth/token',
            {
                grant_type: 'refresh_token', 
                refresh_token: refresh_token
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch( error => {
                try {
                    status = error.response.status;

                    if (error.response) {
                        // Request made and server responded
                        errorMessage = error.response.data;
                    } else if (error.request) {
                        // The request was made but no response was received
                        errorMessage = error.request;
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        errorMessage = error.message;
                    }
                } catch(err) {
                    errorMessage = 'Service Unavailable!'
                }
            });
        return { data: getResult, errorMessage: errorMessage, status: status};
    },
    signup: async (data) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_SIGNUP_API_URL + PATH;

        const getResult = await axios.post(
            URL + 'application_companies',
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch( error => {
                try {
                    status = error.response.status;

                    if (error.response) {
                        // Request made and server responded
                        errorMessage = error.response.data;
                    } else if (error.request) {
                        // The request was made but no response was received
                        errorMessage = error.request;
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        errorMessage = error.message;
                    }
                } catch(err) {
                    errorMessage = 'Service Unavailable!'
                }
            });
        return { data: getResult, errorMessage: errorMessage, status: status};
    },
    read: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_SIGNUP_API_URL + "/admin"+ PATH + api;

        const getResult = await axios.get(
            URL,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .catch( error => {
                try {
                    status = error.response.status;

                    if (error.response) {
                        // Request made and server responded
                        errorMessage = error.response.data;
                    } else if (error.request) {
                        // The request was made but no response was received
                        errorMessage = error.request;
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        errorMessage = error.message;
                    }
                } catch(err) {
                    errorMessage = 'Service Unavailable!'
                }
            });
        return { data: getResult, errorMessage: errorMessage, status: status};
    },
    register: async (email) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_AUTH_API_URL + PATH;

        const getResult = await axios.post(
            URL + 'register',
            {
                email: email
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .catch( error => {
                try {
                    status = error.response.status;

                    if (error.response) {
                        // Request made and server responded
                        errorMessage = error.response.data;
                    } else if (error.request) {
                        // The request was made but no response was received
                        errorMessage = error.request;
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        errorMessage = error.message;
                    }
                } catch(err) {
                    errorMessage = 'Service Unavailable!'
                }
            });
        return { data: getResult, errorMessage: errorMessage, status: status};
    },

}

export default authApi;