/**
 * Created by lakshmi on 14/02/18.
 */
"use strict";

let userController      = {};
let MODEL               = require("../models");
let COMMON_FUN          = require("../util/commonFunction");
let CONSTANTS           = require("../util/constants");


/****/
userController.upload = (REQUEST, RESPONSE)=> {
    console.log(REQUEST.body);

    RESPONSE.jsonp({status: true, message:"upload"});
};


/** register user */
userController.registerUser = (REQUEST, RESPONSE)=>{

    // RESPONSE.jsonp(REQUEST.body);
    let dataToSave = { ...REQUEST.body };
    COMMON_FUN.encryptPswrd(dataToSave.password, (ERR, PASSWORD)=>{
        if(ERR)
            return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
        else {
            dataToSave.password = PASSWORD;
            MODEL.userModel(dataToSave).save({},(ERR, RESULT) => {
                if(ERR)
                    RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
                else{
                    let UserData = {
                      email: RESULT.email,
                      username: RESULT.username,
                      roles: RESULT.roles
                    };
                    RESPONSE.jsonp(COMMON_FUN.sendSuccess(UserData));
                }
            });
        }
    })

};


/** login user **/
userController.loginUser = (REQUEST, RESPONSE)=>{
    //check that all fields are fullfield or not
            let CRITERIA = {$or: [{username: REQUEST.query.username},{email: REQUEST.query.username}]},
                PROJECTION = {__v : 0, createAt: 0};
            /** find user is exists or not */
            MODEL.userModel.findOne(CRITERIA, PROJECTION, {lean: true}).then((USER) => {
                return USER;
            }).then((USER)=>{
                USER ? /** matching password */
                    COMMON_FUN.decryptPswrd(REQUEST.query.password, USER.password, (ERR, MATCHED)=>{
                        if( ERR )
                            return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
                        else if (!MATCHED)
                            return RESPONSE.jsonp(COMMON_FUN.sendSuccess(CONSTANTS.STATUS_MSG.ERROR.INCORRECT_PASSWORD));
                        else{
                            let dataToJwt = {username: USER.username, Date: Date.now, email: USER.email, role: USER.roles},
                                jwtToken  = COMMON_FUN.createToken(dataToJwt); /** creating jwt token */
                            dataToJwt.token = jwtToken;
                            return RESPONSE.jsonp(COMMON_FUN.sendSuccess(dataToJwt));
                        }
                    })
                :RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.INVALID_EMAIL));

            }).catch((err) => {
                return RESPONSE.jsonp(COMMON_FUN.sendError(ERR))
            });
};

/*forgot password*/
userController.forgotPassword = (REQUEST, RESPONSE)=>{
            let CRITERIA = {email: REQUEST.body.username},
                PROJECTION = {__v : 0, createAt: 0};
            /** find user is exists or not */
            MODEL.userModel.findOne(CRITERIA, PROJECTION, {lean: true}).then((USER) => {
                return USER;

            }).then((USER)=>{
                const OTP = COMMON_FUN.generateRandomString();
                const subject = CONSTANTS.MAIL_STATUS.OTP_SUB;
                USER.type = 0; // for forget password mail
                USER ? /** forgot Password */
                    COMMON_FUN.sendEmail(USER, subject, OTP, (ERR,RESULT)=>{
                        if( ERR ){
                            return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
                        }   
                        else{
                          let saveToOTP= {
                              userId: USER._id,
                              userEmail: USER.email,
                              otp: OTP
                          };
                          MODEL.otp_Model.findOneAndUpdate({userId: USER._id}, {$set : saveToOTP},{upsert: true}).then((RESULT)=>{
                                return RESPONSE.jsonp(COMMON_FUN.sendSuccess(CONSTANTS.STATUS_MSG.SUCCESS.CREATED));
                          }).catch((Err)=>{
                                return Err;
                          });
                        }
                    })
                :RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.INVALID_EMAIL));

            }).catch((err) => {
                return RESPONSE.jsonp(COMMON_FUN.sendError(ERR))
            });
};

/*Change password*/
userController.changePassword = async (REQUEST, RESPONSE)=>{
        try {
            /* check user exist or not*/
            let checkUserExist = await MODEL.userModel.findOne({email: REQUEST.body.username}, {}, {lean: true});
            /* check otp exist or not*/
            let checkOTP = await MODEL.otp_Model.findOne({
                $and: [
                    {userEmail: REQUEST.body.username},
                    {otp: REQUEST.body.otp},
                ]
            }, {}, {lean: true});
            if (checkUserExist && checkOTP) {
                /*encrypt password*/
                COMMON_FUN.encryptPswrd(REQUEST.body.password, (ERR, HASH) => {
                    /*update password in usermodel */
                    MODEL.userModel.update({email: REQUEST.body.username}, {$set: {password: HASH}}).then((SUCCESS) => {
                        /*remove otp from otp schema*/
                        MODEL.otp_Model.remove({$and: [
                            {userEmail: REQUEST.body.username},
                            {otp: REQUEST.body.otp},
                        ]},(ERR, RESULT)=>{
                            if(ERR)
                                return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
                            else
                                return RESPONSE.jsonp(COMMON_FUN.sendSuccess(CONSTANTS.STATUS_MSG.SUCCESS.CREATED));
                        });
                    }).catch((ERR) => {
                        return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
                    });
                });
            }else if(checkUserExist && !checkOTP){
                return RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.INVALID_OTP_CODE));
            }else{
                return RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.INVALID_EMAIL));
            }
        } catch (ERR) {
            return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
        }
};


/*change loggged in user password*/
userController.changedlogedInPassword = (REQUEST, RESPONSE)=>{
    let BODY = REQUEST.body;
        COMMON_FUN.objProperties(REQUEST.body, (ERR, RESULT)=> {
        if (ERR) {
           return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
        }else{
            MODEL.userModel.findOne({email: REQUEST.body.username},{},{lean: true}).then(RESULT=>{
                if(!RESULT)
                    return RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.NOT_FOUND));
                else{
                    COMMON_FUN.decryptPswrd(BODY.currentPassword, RESULT.password, (ERR, isMatched)=>{
                        if(ERR){
                            return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
                        }else if(isMatched){
                            COMMON_FUN.encryptPswrd(BODY.newPassword, (ERR, HASH)=>{
                                if(ERR)
                                    return RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.INCORRECT_PASSWORD));
                                else{
                                    MODEL.userModel.update({email: BODY.username},{$set: {password:HASH}},{}).then(SUCCESS=>{
                                        return RESPONSE.jsonp(COMMON_FUN.sendSuccess(CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT));
                                    }).catch(ERR=>{
                                        return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
                                    });
                                }
                            })
                        }else{
                            return RESPONSE.jsonp(COMMON_FUN.sendError(CONSTANTS.STATUS_MSG.ERROR.INCORRECT_PASSWORD));
                        }
                    })
                }
            }).catch(ERR=>{
                return RESPONSE.jsonp(COMMON_FUN.sendError(ERR));
            })
        }
    })
};




/* export userControllers */
module.exports = userController;