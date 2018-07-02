/**
 * Created by Radhey Shyam on 11/14/17.
 */

// const async          = require('async');
const Boom           = require('boom');
let CONSTANTS        = require('./constants');
const fs             = require('fs');
let CONFIG           = require('../config');
const MONGOOSE       = require('mongoose');
const BCRYPT         = require("bcryptjs");
const JWT            = require("jsonwebtoken");
const randomstring   = require("randomstring");
const cherio         = require("cheerio");
const SEND_IN_BLUE   = require('sendinblue-api');
const MOMMENT        = require("moment-timezone");


/**
 * incrypt password in case user login implementation
 * @param {*} userPassword 
 * @param {*} cb 
 */
let encryptPswrd = (userPassword, cb) => {
  BCRYPT.hash(userPassword, 10, (err, encryptPswrd) => {
    return err ? cb(err) : cb(null, encryptPswrd);
  });
};



/**
 * @param {** decrypt password in case user login implementation} payloadPassword 
 * @param {*} userPassword 
 * @param {*} cb 
 */
let decryptPswrd = (payloadPassword, userPassword, cb) => {
  BCRYPT.compare(payloadPassword, userPassword, (err, isMatched) => {
    return err ? cb(err) : cb(null, isMatched);
  });
};


/** To capitalize a stirng ***/
String.prototype.capitalize = function() {

    return this.charAt(0).toUpperCase() + this.slice(1);
};



/**
 * if will take any kind of error and make it in embedded format as per the project require
 * @param {*} data  (data could be object or string depecds upon the error type)
 */
let sendError = function (data) {

  let errorToSend = '',
      errorCode = data.code ? data.code : 0;

  if (typeof data === 'object' && data.hasOwnProperty('statusCode') && data.hasOwnProperty('customMessage')) {
    data.data = null;
    return data;
  }
  else {
    if (typeof data === 'object') {

      if (data.name === 'MongoError' || data.name === 'BulkWriteError' ) {

        errorToSend += CONSTANTS.STATUS_MSG.ERROR.DB_ERROR.customMessage;

        if (data.code = 11000) {

          let duplicateValue = data.errmsg.split(":");
          duplicateValue   = duplicateValue[2].split("_1")[0];
          duplicateValue = duplicateValue.trim().capitalize();
          duplicateValue += CONSTANTS.ERROR_MESSAGE.isAlreadyExist;
          errorToSend = duplicateValue;
        }
      } else if (data.name === 'ApplicationError') {

        errorToSend += CONSTANTS.STATUS_MSG.ERROR.APP_ERROR.customMessage + ' : ';
      } else if (data.name === 'ValidationError') {

          let keys = Object.keys(data.errors, []);
          errorToSend = data.errors[keys[0]].message;
          errorCode = 422;
          errorToSend = replaceValueFromString(errorToSend, 'Path','');
          errorToSend = replaceValueFromString(errorToSend, /\`/g, '');
          errorToSend = replaceValueFromString(errorToSend, /\./g, '');
          errorToSend = errorToSend.trim();
          errorToSend = errorToSend.capitalize();

      } else if (data.name === 'CastError') {

        errorToSend += CONSTANTS.STATUS_MSG.ERROR.DB_ERROR.customMessage + CONSTANTS.STATUS_MSG.ERROR.INVALID_ID.customMessage + data.value;
      } else {
        errorToSend = data.message;
      }
    } else {
      errorToSend = data
    }
    let customErrorMessage = errorToSend;
    if (typeof customErrorMessage == 'string') {
      if (errorToSend.indexOf("[") > -1) {
        customErrorMessage = errorToSend.substr(errorToSend.indexOf("["));
      }
      customErrorMessage = customErrorMessage && customErrorMessage.replace(/"/g, '');
      customErrorMessage = customErrorMessage && customErrorMessage.replace('[', '');
      customErrorMessage = customErrorMessage && customErrorMessage.replace(']', '');
    }
    return {statusCode: errorCode ? errorCode : 400, customMessage: customErrorMessage, data: null }
  }
};



/**
 * Send success message to frontend
 * @param {*} successMsg 
 * @param {*} data 
 */
let sendSuccess =  (successMsg, data)=> {
  successMsg = successMsg || CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT.customMessage;
  if (typeof successMsg == 'object' && successMsg.hasOwnProperty('statusCode') && successMsg.hasOwnProperty('customMessage')) {
    return { statusCode: successMsg.statusCode, customMessage: successMsg.customMessage,  data: data || null };
  } else {
    return { statusCode: 200, customMessage: successMsg, data: data || null };
  }
};



/**
 * Check duplicate value in array
 * @param {*} request 
 * @param {*} reply 
 * @param {*} source 
 * @param {*} error 
 */
let checkDuplicateValuesInArray =  (array)=> {
    let storeArray = [];
    let duplicateFlag = false;
    if(array && array.length>0){
        for (let i=0; i<array.length;i++){
            if (storeArray.indexOf(array[i]) == -1){
                storeArray.push(array[i])
            }else {
                duplicateFlag = true;
                break;
            }
        }
    }
    storeArray = [];
    return duplicateFlag;
};


/**
 * Generate random string according to the requirement, it will generate 7 character string
 */
let generateRandomString = ()=> {
  return randomstring.generate({
    length: 5,
    charset: 'numeric'
  });
};



/**
 * Filter the array
 * @param {*} array 
 */
let filterArray =  (array) =>{
  return array.filter(function (n) {
    return n !== undefined && n !== ''
  });
};



/**
 * sanitizer for spliting a string corresponding to space if string has value otherwise it will join the space in it
 * @param {*} string 
 */
let sanitizeName =  (string) => {
  return filterArray(string && string.split(' ') || []).join(' ')
};



/**
 * Verify email is in correct format or not
 * @param {*} string 
 */
let verifyEmailFormat = (email)=> {
  return validator.isEmail(email);
};



/** check all fields are available */
let objProperties = (obj, callback)=>{
    for (i in obj) {
        if (!obj[i]) {
            return callback(i+CONSTANTS.STATUS_MSG.ERROR.CUSTOME_ERROR.customMessage);
        }
        else if(typeof obj[i] == "object"){
            for (j in obj[i]) {
                if (!obj[i][j]) {
                    return callback(j+CONSTANTS.STATUS_MSG.ERROR.CUSTOME_ERROR.customMessage);
                }
            }
        }
    }
    return callback(null);
};



/** check all fields are available */
let objToArray = (obj)=>{
    let arr = [];
    for (i in obj) {
        if(typeof obj[i] == "object"){
            for (j in obj[i]) {
                arr.push(obj[i][j]);
            }
        }else{
            arr.push(obj[i]);
        }
    }
    return arr;
};



/**
 * @param {*} errObj error obj from constants
 * @param {*} customMsg custom new msg
 * @param {*} callback callback back to api || controller || service || routes
 */
let customErrorResponse = (errObj, customMsg, callback)=>{
    errObj.message = customMsg;
    callback(errObj);
};



/** used for converting string id to mongoose object id */
let convertIdToMongooseId = (stringId)=>{
  return MONGOOSE.Types.ObjectId(stringId);
};




/** create jsonwebtoken **/
let createToken =  (objData)=>{
    return JWT.sign(objData, CONSTANTS.SERVER.JWT_SECRET_KEY , { expiresIn: 1 });
};



/*search filter*/
let dataFilter = (data, cb)=>{
    let CRITERIA = {};
    data.type = Number(data.type);
    switch(data.filteredData){
            case "status" : CRITERIA = { [data.filteredData]: data.type };
                cb(null, CRITERIA);
                break;
            default:
                cb(null, CRITERIA);
                break;
    }
};


/**
 * replace . with  :
 */
let replaceValueFromString = (stringValue, valueToReplace, value) => {
    /** for special character ayou have to pass /\./g, **/
    return stringValue.replace(valueToReplace, value);
};



/*exporting all object from here*/
module.exports = {
  sendError: sendError,
  sendSuccess: sendSuccess,
  encryptPswrd: encryptPswrd,
  decryptPswrd: decryptPswrd,
  checkDuplicateValuesInArray: checkDuplicateValuesInArray,
  verifyEmailFormat: verifyEmailFormat,
  filterArray: filterArray,
  sanitizeName: sanitizeName,
  customErrorResponse: customErrorResponse,
  convertIdToMongooseId: convertIdToMongooseId,
  objProperties: objProperties,
  createToken: createToken,
  generateRandomString:generateRandomString,
  objToArray:objToArray,
  dataFilter: dataFilter,
  replaceValueFromString: replaceValueFromString
};