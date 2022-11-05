/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from 'react';
import axios from 'axios';
import { Base64 } from 'js-base64';
import moment from 'moment';
import Tinycon from 'tinycon';
import { toast } from 'react-toastify';

import api from "../api/api";


const { REACT_APP_GOOGLE_MAP_API_KEY } = process.env;


const apiUtil = {
    getBaseUrl: () => {
        return window.location.protocol + '//' + window.location.host;
    },

    getCancelToken: getToken => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        return source;
    },

    getGoogleMapApiKey: () => {
        return REACT_APP_GOOGLE_MAP_API_KEY;
    },
    getGoogleMapUrl: () => {
        return "https://maps.googleapis.com/maps/api/js?key=" + REACT_APP_GOOGLE_MAP_API_KEY + "&v=3.exp&libraries=geometry,drawing,places";
    },

    getObject: (str = '') => {
        let obj = null;
    
        if(str && str !== ''){
          try {
            obj = JSON.parse(str);
          } catch(e){}
        }
    
        return obj;
    },

    getUserInfo: (user = null) => {
        if(user){
            let userInfo = apiUtil.getObject(user);
        
            if(userInfo){
                return userInfo;
            } else {
              return null;
            }
        } else {
            return null;
        }
    },
    
    getUserLogo: (user = null, defaultImg) => {
        if(user){
            let userInfo = apiUtil.getObject(user);
        
            if(userInfo && userInfo.owner_info && userInfo.owner_info.profile_image_url && userInfo.owner_info.profile_image_url !== null && userInfo.owner_info.profile_image_url !== ''){
                return userInfo.owner_info.profile_image_url;
            } else {
              return defaultImg;
            }
        } else {
            return defaultImg;
        }
    },

    getUserName: (user = null) => {
        let userName = '';

        if(user){
            let userInfo = apiUtil.getObject(user);
            
            if(userInfo && userInfo.owner_info && userInfo.owner_info.first_name && userInfo.owner_info.first_name !== null && userInfo.owner_info.first_name !== ''){
                userName += userInfo.owner_info.first_name;
            }

            if(userInfo && userInfo.owner_info && userInfo.owner_info.last_name && userInfo.owner_info.last_name !== null && userInfo.owner_info.last_name !== ''){
                userName += ' ' + userInfo.owner_info.last_name;
            }
        }

        return userName;
    },

    getFirstName: (user = null) => {
        let userName = '';

        if(user){
            let userInfo = apiUtil.getObject(user);
            
            if(userInfo && userInfo.owner_info && userInfo.owner_info.first_name && userInfo.owner_info.first_name !== null && userInfo.owner_info.first_name !== ''){
                userName = userInfo.owner_info.first_name;
            }
        }

        return userName;
    },
    getLastName: (user = null) => {
        let userName = '';

        if(user){
            let userInfo = apiUtil.getObject(user);
            
            if(userInfo && userInfo.owner_info && userInfo.owner_info.last_name && userInfo.owner_info.last_name !== null && userInfo.owner_info.last_name !== ''){
                userName = userInfo.owner_info.last_name;
            }
        }

        return userName;
    },

    getAppCompanyId: (user = null) => {
        if(user){
            let userInfo = apiUtil.getObject(user);
        
            if(userInfo && userInfo.owner_info && userInfo.owner_info.application_company_id && userInfo.owner_info.application_company_id !== null && userInfo.owner_info.application_company_id > 0){
                return userInfo.owner_info.application_company_id;
            } else {
              return '';
            }
        } else {
            return '';
        }
    },
    
    parseResult(result = null, success = null, error = null) {
        if(result.status === 500) {
            if(error) {
                if(result && result.errorMessage && result.errorMessage.error !== ''){
                    error('The selected action is not possible, this item is already in use!', 'warning', null);
                } else {
                    error('Unknown error occurred. Please try again', 'warning', null);
                }
            }
            return;
        }
        
        if (result.status == 422) {
            if(result && result.errorMessage && result.errorMessage.data && result.errorMessage.data.message) {

                error(result.errorMessage.data.message, 'error', null);
            }
            return;
        }

		if (result.errorMessage === null || result.errorMessage === '') {
            if(result && result.data && result.data.data && result.data.data.error){
                let data = result.data.data.error;

                if(error){
                    error(data.error, 'error', null);
                }
            } else if(result && result.data && result.data.data){
                let data = result.data.data;
                if(success){
                    success(data, 'success', null);
                }
            } else {
                if(error){
                    error('An error occurred, please try again!', 'warning', null);
                }
            }
        } else {
            if(typeof result.errorMessage === 'string'){
                if(error){
                    error(result.errorMessage, 'error', null);
                }
            } else {
                if(result.errorMessage.errors){
                    if(result.errorMessage.errors && (typeof result.errorMessage.errors === 'object')){
                        let errorsArr = [];
                        let errArr = Object.keys(result.errorMessage.errors).map((err, i) => {
                            errorsArr = {
                                field: err,
                                error: result.errorMessage.errors[err][0]
                            };
                            return result.errorMessage.errors[err][0];
                        });
                        
                        if(error){
                            error(errArr, 'error', errorsArr);
                        }
                    } else {
                        let errorsArr = [];
                        let errArr = Object.keys(result.errorMessage).map((err, i) => {
                            errorsArr = {
                                field: err,
                                error: result.errorMessage.errors[err][0]
                            };
                            return result.errorMessage[err];
                        });
                        
                        if(error){
                            error(errArr, 'error', errorsArr);
                        }
                    }
                } else {
                    if(result.errorMessage.error) {
                        if(error){
                            error(result.errorMessage.error, 'error', []);
                        }
                    } else {
                        if(error){
                            error('Error', 'error', []);
                        }
                    }
                }
            }
        }
    },

    isInArray(array, value) {
        return array.indexOf(value) > -1;
    },
    removeFromArray(array, value) {
        let index = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    },
    
    isEmptyField(data, field) {
        return (data) ? (data[field] === '') ? true : false : false;
    },
    isEmptyRow(obj, fields) {
        try {
            return !fields.map((f) => {
                return obj[f] === '' ? true : false
            }).some(e => e === false);
        } catch(err) {}
    },
    removeEmptyRows(array = [], fields = []) {
        return array.map((value) => {
            let row = fields.map((f) => {
                return value[f]
            }).filter((e) => {
                return e === 0 ? '0' : e
            });
            return (row && row.length > 0) ? value : null;
        }).filter(x => x !== null)
    },
    
    customFilter(array, param, value) {
        let items = (array && array.length > 0) ? array.filter(x => {
            if (value !== null) {
                return x[param].toString().toLowerCase().trim() === value.toString().toLowerCase().trim();
            }
        }) : [];
        return (items && items.length > 0) ? items[0] : null;
    },

    filterByAll(array, value) {
        return array.filter(o => Object.keys(o).some(k => o[k].toString().toLowerCase().includes(value.toString().toLowerCase())));
    },
    filterByParam(array, param, value) {
        return array.filter(o => Object.keys(o).some(k => o[param].toString().toLowerCase().includes(value.toString().toLowerCase())));
    },
    filterByParams(array, params, value) {
        return array.filter(o => Object.keys(o).some(k => {
            for(let i = 0; i < params.length; i++){
                let param = params[i];

                if(o[param]){
                    return o[param].toString().toLowerCase().includes(value.toString().toLowerCase());
                }
            }
        }));
    },

    isNumeric: (x) => {
        return parseFloat(String(x)) == x;
    },
    
    rndChars(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for(var i = 0; i < length; i++) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    },

    generateFileName: (path = '', fileName = '') => {
        let pathArr = path.split('/');
    
        let generatedFileName = '';
        if(pathArr && pathArr.length > 0){
            for(let i = 0; i < pathArr.length; i++) {
                generatedFileName += ((i === 0) ? '' : '-') + pathArr[i];
            }
        }
        
        generatedFileName += moment().format('YYYYMMDD');
        generatedFileName += apiUtil.rndChars(6);
        generatedFileName += '-' + fileName;

        return generatedFileName;
    },

    getMyLocation(callback = null) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                if(callback !== null)
                    callback(position.coords);
            });
        } else {
            if(callback !== null)
                callback(null);
        }
    },
    getGmapAddress(place, type) {
        let address = '';
        if(place){
            if(place.formatted_address){
                address = place.formatted_address;
            } else if(place.name){
                address = place.name;
            }
        }
        return address;
    },
    getGmapCoordinate(place) {
        if(place && place.geometry && place.geometry.location){
            return {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
                coordinates: ((place.geometry.location.lat() !== '') ? (place.geometry.location.lat() + ',' + place.geometry.location.lng()) : '')
            };
        } else {
            return null;
        }
    },
    getFromAddress(place, type) {
        let components = place["address_components"] || [];

        if(components && components.length > 0){
            return components.filter((component) => component.types.indexOf(type) === 0).map((item) => item.long_name).pop() || null;
        } else {
            return null;
        }
    },

    
    objToArr(obj = null) {
        let arr = [];
        if(obj !== null){
            for (let [key, value] of Object.entries(obj)) {
                arr.push({
                    key: key,
                    value: value
                });
            }
        }
        return arr;
    },
    
    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },
    
    formValidation(form) {
        const formData = new FormData(form)
        const validationMessages = Array
        .from(formData.keys())
        .reduce((acc, key) => {
          acc[key] = form.elements[key].validationMessage
          return acc
        }, {})
		return validationMessages;
    },
    formValidate(form) {
        const validationMessages = this.formValidation(form);
        const validationMessagesArr = apiUtil.objToArr(validationMessages);
        
        if(validationMessagesArr && validationMessagesArr.length > 0){
            for(let i = 0; i < validationMessagesArr.length; i++){
                if(validationMessagesArr[i].value !== ''){
                    this.focusElement(validationMessagesArr[i].key);
                    return validationMessagesArr[i]
                }
            }

            return null;
        } else {
            return null;
        }
    },
    emailValidation(email) {      
        var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailReg.test(email); 
    },
    passwordValidation(str, regex = null) {
        if(regex === null){
            // Minimum eight characters, at least one letter, one number and one special character
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/g.test(str);
        } else {
            return regex.test(str);
        }
    },
    passwordValidationSimple(str) {
        // The password must contain at least six letters or numbers
        return /[A-Za-z\d@$!%*#?&]{6,}/g.test(str);
    },

    getPaginationCount(totalRows, rowsPerPageCount) {
        let mod = totalRows % rowsPerPageCount;
        let pages = totalRows / rowsPerPageCount;
        return (mod > 0) ? (parseInt(pages) + 1) : pages;
    },

    getMaxPageSize: () => {
        return 99999;
    },
    getDefaultPageSize: () => {
        return 10;
    },
    getDefaultDateFormat: () => {
        return 'YYYY-MM-DD';
    },
    getDefaultTimeFormat: () => {
        return 'HH:mm';
    },
    getDefaultDateTimeFormat: () => {
        return 'YYYY-MM-DD HH:mm';
    },

    getImportDateFormat: () => {
        return 'DD/MM/YYYY';
    },
    getImportTimeFormat: () => {
        return 'HH:mm A';
    },
    getImportDateTimeFormat: () => {
        return 'DD/MM/YYYY HH:mm A';
    },

    getUint8Array: (base64) => {
        return Base64.toUint8Array(base64);
    },

    statusToClassName: (status = '') => {
        return status.toString().toLowerCase().trim().replace(' ', '-');
    },

    toast: (text = '', icon = null, type = '', autoClose = 5000, layout = null, position = 'top-right') => {
        let options = {
            position: position,
            autoClose: autoClose,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
        };

        if(!layout){
            layout = <div>
                {icon && <i className={'material-icons'}>{icon}</i>}
                <span>{text}</span>
            </div>;
        }

        if(type !== '') {
            toast[type](layout, options);
        } else {
            toast(layout, options);
        }
    },
    toastOnBoarding: (text = '', icon = null, type = '', autoClose = 2000, layout = null, position = 'top-center') => {
        let options = {
            position: position,
            autoClose: autoClose,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: false,
        };

        if(!layout){
            layout = <div>
                {icon && <i className={'material-icons'}>{icon}</i>}
                <span>{text}</span>
            </div>;
        }

        if(type !== '') {
            toast[type](layout, options);
        } else {
            toast(layout, options);
        }
    },

    setFavNumb: (x = '') => {
        Tinycon.setBubble(x);

        Tinycon.setOptions({
            color: 'white',
            background: '#03A9F4',
            fallback: true
        });
    },

    concat: (txt1 = '', txt2 = '') => {
        if((txt1 && txt1 !== '') && (txt2 && txt2 !== '')){
            return txt1 + ' ' + txt2;
        } else if(txt1 && txt1 !== ''){
            return txt1;
        } else if(txt2 && txt2 !== ''){
            return txt2;
        } else {
            return '';
        }
    },

    updateRow: (array = [], row = null, paramId = '') => {
        let newArray = [...array];
        if((paramId && paramId !== '') && row && newArray && newArray.length > 0){
            let index = newArray.findIndex(x => x[paramId] === row[paramId]);

            if(index > -1) {
                newArray[index] = row;
            }
        }
        return newArray;
    },

    fileToBase64(file){
        return new Promise((resolve) => {
            if(file){
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => resolve('');
            } else {
                resolve('');
            }
        });
    },
    blobToBase64(blob){
        return new Promise((resolve) => {
            if(blob){
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => resolve('');
            } else {
                resolve('');
            }
        });
    },

    setCookie: (name, value, expires=7200) => {
        let now = new Date();
        let time = now.getTime();
        let expireTime = time + expires;
        now.setTime(expireTime);
        document.cookie = name + "=" + value + ";path=/;expires=" + now + ";domain=.worknode.ai";
        return true;
    },

    getCookie: (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    },

    deleteCookie: (name, path="/", domain=".worknode.ai") => {
        document.cookie = name + "=" + ((path) ? ";path="+path:"") + ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
        return true;
    },

    callUpdateAdminProfileApi: (accessToken, callback = null) => {
        let params = {
            "is_onboarding": false,
        };

        api.updateAdminProfile('profile/admins', params, accessToken).then((result) => {
            apiUtil.parseResult(result, (data) => {
                if(callback){
                    callback(data.result);
                }
            }, (error, type) => {
                if(callback){
                    callback(null);
                }
            });
        });
    }
}

export default apiUtil;