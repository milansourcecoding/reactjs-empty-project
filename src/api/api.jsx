import axios from 'axios';
import apiUtil from '../utils/Utils';

const { 
    REACT_APP_AUTH_API_URL
} = process.env;

const PATH = 'admin/api/';
const UPLOADIMAGEPATH = 'api/';

const api = {

    apiCall: async (api, data) => {
        let errorMessage = "";
        let status = 0;

        const URL = api;
        
        const getResult = await axios.get(URL, data)
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
    apiCallPost: async (api, data) => {
        let errorMessage = "";
        let status = 0;

        const URL = api;
        
        const getResult = await axios.post(URL, data)
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

    get: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_AUTH_API_URL + api;
        
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

    read: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_AUTH_API_URL + PATH + api;
        
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

    readSettings: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_AUTH_API_URL + PATH + api;
        
        const getResult = await axios.get(
            URL,
            { 
                params: data,
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'app-name': 'AUTH',
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

        const URL = REACT_APP_AUTH_API_URL + PATH + api;

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
    uploadImage: async (api, data, token, callback = null) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_AUTH_API_URL + UPLOADIMAGEPATH + api;

        const getResult = await axios.post(
            URL,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'app-name': data.appName? data.appName: undefined
                },
                onUploadProgress: function (progressEvent) {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    
                    if (totalLength !== null) {
                        let progress = Math.round( (progressEvent.loaded * 100) / totalLength );

                        if(callback !== null){
                            callback(progress);
                        }
                    }
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
    uploadFile: async (api, file, appName, path, fileName, ext, token, callback = null) => {
        let errorMessage = "";
        let status = 0;

        let fName = apiUtil.generateFileName(path, fileName);

        const formData = new FormData();
        formData.append('picture', file, fName + '.' + ext);
        formData.append('picture_name', fName + '.' + ext);
        formData.append('folder_name', path);

        const URL = REACT_APP_AUTH_API_URL + UPLOADIMAGEPATH + api;

        const getResult = await axios.post(
            URL,
            formData,
            {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'app-name': appName ? appName: undefined
                },
                onUploadProgress: function (progressEvent) {
                    const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                    
                    if (totalLength !== null) {
                        let progress = Math.round( (progressEvent.loaded * 100) / totalLength );

                        if(callback !== null){
                            callback(progress);
                        }
                    }
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

        const URL = REACT_APP_AUTH_API_URL + PATH + api;

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

    createCustomerAccount: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;
        console.log("create customer acc")
        const URL = REACT_APP_AUTH_API_URL + PATH + api;

        const getResult = await axios.post(
            URL,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'app-name': 'WLS',
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
    updateCustomerAccount: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;
        console.log("update customer acc")
        const URL = REACT_APP_AUTH_API_URL + PATH + api;

        const getResult = await axios.put(
            URL,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'app-name': 'WLS',
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
    deleteCustomerAccount: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;
        console.log("delete customer acc")
        const URL = REACT_APP_AUTH_API_URL + PATH + api;

        const getResult = await axios(
            {
                method: 'delete',
                url: URL,
                data: data, 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'app-name': 'WLS'
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
    updateAdminProfile: async (api, data, token) => {
        let errorMessage = "";
        let status = 0;

        const URL = REACT_APP_AUTH_API_URL + PATH + api;

        const getResult = await axios.put(
            URL,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                    'app-name': 'AUTH',
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

        const URL = REACT_APP_AUTH_API_URL + PATH + api;

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

        const URL = REACT_APP_AUTH_API_URL + PATH + api + '/' + id;
        
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