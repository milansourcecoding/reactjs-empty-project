import axios from 'axios';

const { 
    REACT_APP_API_URL
} = process.env;

const PATH = 'auth/';


const authApi = {
    
    login: async (email, password) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_API_URL + PATH;

        const getResult = await axios.post(
            URL + 'login',
            {
                email: email,
                password: password,
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

    register: async (name, email, password) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_API_URL + PATH;

        const getResult = await axios.post(
            URL + 'register',
            {
                name: name,
                email: email,
                password: password
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