/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
import React from 'react';
import moment from 'moment';
import Tinycon from 'tinycon';
import { toast } from 'react-toastify';


const Utils = {
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

    setFavNumb: (x = '') => {
        Tinycon.setBubble(x);

        Tinycon.setOptions({
            color: 'white',
            background: '#03A9F4',
            fallback: true
        });
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
        generatedFileName += Utils.rndChars(6);
        generatedFileName += '-' + fileName;

        return generatedFileName;
    },
    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
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

}

export default Utils;