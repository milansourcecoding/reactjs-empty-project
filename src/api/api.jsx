import axios from 'axios';

const { 
    REACT_APP_API_URL
} = process.env;

const PATH = 'todos/';

const api = {

    read: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_API_URL + PATH + api;
        
        const getResult = await axios.get(
            URL,
            { 
                params: data,
                data: data,
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

    create: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_API_URL + PATH + api;

        const getResult = await axios.post(
            URL,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'app-name': data.appName? data.appName: undefined
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
    
    update: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_API_URL + PATH + api;

        const getResult = await axios.put(
            URL,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'app-name': data.appName? data.appName: undefined
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

    delete: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_API_URL + PATH + api;

        const getResult = await axios(
            {
                method: 'delete',
                url: URL,
                data: data, 
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

    details: async (api, id, token) => {
        console.log(id);
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_API_URL + PATH + api + '/' + id;
        
        const getResult = await axios.get(
            URL,
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
    
}

export default api;