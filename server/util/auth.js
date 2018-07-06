/**
 * Created by Radhey Shyam on 15/02/18.
 */

"use strict";


/************** Modules **************/
let MODEL           =   require("../models");
let COMMON_FUN      =   require("../util/commonFunction");
let CONSTANTS       =   require("../util/constants");
const JWT           =   require("jsonwebtoken");

let velidateUser = {};

/********************************
 ********* validate user ********
 ********************************/
velidateUser.userValidation = ( REQUEST, RESPONSE, NEXT )=>{
    let status = JWT.decode(REQUEST.headers.authorization, CONSTANTS.SERVER.JWT_SECRET_KEY);
    (status && status.role === CONSTANTS.DATABASE.USER_ROLES.USER) ? NEXT() : RESPONSE.jsonp(CONSTANTS.STATUS_MSG.ERROR.UNAUTHORIZED);
};

/********************************
 ****** admin authentication ****
 ********************************/
velidateUser.adminValidation = ( REQUEST, RESPONSE, NEXT )=>{
    let status = REQUEST.headers.authorization ?
        JWT.decode(REQUEST.headers.authorization, CONSTANTS.SERVER.JWT_SECRET_KEY):
        JWT.decode(REQUEST.query.api_key, CONSTANTS.SERVER.JWT_SECRET_KEY);

    (status && status.role === CONSTANTS.DATABASE.USER_ROLES.ADMIN) ? NEXT() : RESPONSE.jsonp(CONSTANTS.STATUS_MSG.ERROR.UNAUTHORIZED);
};

/********************************
****** admin check model ********
*********************************/
velidateUser.adminCheck = ( REQUEST, RESPONSE, NEXT )=>{
    let dataObj = REQUEST.query.username;
    if(REQUEST.query.username){
        dataObj = REQUEST.query;
    }else{
        dataObj = REQUEST.body;
    }

    /** Check required properties **/
    COMMON_FUN.objProperties(dataObj, (ERR, RESULT)=> {
        if (ERR) {
            return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
        } else {
            MODEL.userModel.findOne({
                $or: [
                    {username: dataObj.username},
                    {email: dataObj.username}
                ]
            }, {}, {lean:true}, (ERR, RESULT) => {
                if (ERR) {
                    return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
                }else if(!RESULT){
                    return RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.INVALID_USERNAME));
                }
                else{
                    RESULT.roles === CONSTANTS.DATABASE.USER_ROLES.ADMIN ? NEXT() : RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.UNAUTHORIZED));
                }
            })
        }
    });
};

/********************************
 ****** User check model ********
 *********************************/
velidateUser.userCheck = ( REQUEST, RESPONSE, NEXT )=>{
    let dataObj = REQUEST.query.username;
    if(REQUEST.query.username){
        dataObj = REQUEST.query;
    }else{
        dataObj = REQUEST.body;
    }
    COMMON_FUN.objProperties(dataObj, (ERR, RESULT)=> {
        if (ERR) {
            return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
        } else {
            MODEL.userModel.findOne({
                $or: [
                    {username: dataObj.username},
                    {email: dataObj.username}
                ]
            }, {}, {lean:true}, (ERR, RESULT) => {
                if (ERR) {
                    return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
                }else if(!RESULT){
                    return RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.INVALID_USERNAME));
                }
                else{
                    RESULT.roles === CONSTANTS.DATABASE.USER_ROLES.USER ? NEXT() : RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.UNAUTHORIZED));
                }
            })
        }
    });
};

/* export userControllers */
module.exports = velidateUser;