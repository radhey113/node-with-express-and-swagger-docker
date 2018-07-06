'use strict';


/************** Modules ***************/
let CONSTANTS           = require('../constants');
let Models              = require('../../models');
let UniversalFunction   = require('../commonFunction');

/******************************************
 * Bootstraping for default admin user... *
 ******************************************/
exports.bootstrapAdmin = function (callback) {

    /**Default users**/
    let defaultUser = [
        {
            email: 'admin@example.com',
            password: 'fa59d2b94e355a8b5fd0c6bac0c81be5',
            username: 'example',
            roles: 'ADMIN'
        },
        {
            email: 'radhey@example.com',
            password: 'fa59d2b94e355a8b5fd0c6bac0c81be5',       //asdfghjkl
            username: 'example1',
            roles: 'USER'
        }
    ];

    /******************************************
     ******** Default user mapping... *********
     ******************************************/
    return Promise.all(defaultUser.map( USER => {

        UniversalFunction.encryptPswrd(USER.password, (ERR, HASH)=> {
            if(ERR){
                throw ERR;
            }
            else {
                USER.password = HASH;
                return Models.userModel.findOneAndUpdate(
                    {email: USER.email, username: USER.username},
                    {$set: USER},
                    {new: true, upsert: true, lean: true, setDefaultsOnInsert: true}
                ).then(RESULT => {

                    return RESULT;
                }).catch(ERROR => {
                    throw ERROR;
                })
            }
        });
    })).then(RESULT => {

        callback(null, CONSTANTS.STATUS_MSG.SUCCESS.CREATED);
    }).catch(ERROR => {

        callback(UniversalFunction.sendError(ERROR));
    });
};

/****************************************************************
 **** Maping app version with app model with respect to user*****
 ***************************************************************/
exports.bootstrapAppVersion = function () {
     let AppVersion = [
         {
            latestIOSVersion: '100',
            latestAndroidVersion: '100',
            criticalAndroidVersion: '100',
            criticalIOSVersion: '100',
            appType: CONSTANTS.DATABASE.USER_ROLES.USER
         },
         {
            latestIOSVersion: '100',
            latestAndroidVersion: '100',
            criticalAndroidVersion: '100',
            criticalIOSVersion: '100',
            appType: CONSTANTS.DATABASE.USER_ROLES.SUB_ADMIN
         },
         {
            latestIOSVersion: '100',
            latestAndroidVersion: '100',
            criticalAndroidVersion: '100',
            criticalIOSVersion: '100',
            appType: CONSTANTS.DATABASE.USER_ROLES.ADMIN
        }
     ];

    /**********************
     **** Mapping data*****
     **********************/
    Promise.all(AppVersion.map(APP_V => {

        let CRITERIA = { appType: APP_V.appType };
        let OPTIONS = { upsert: true, new: true, setDefaultsOnInsert: true };

            /**Save App version by mapping **/
            return Models.appVersionModel.findOneAndUpdate( CRITERIA, { $set: APP_V }, OPTIONS ).then(RESULT => {

                return RESULT;
            }).catch(ERROR => {

                throw ERROR;
            })
    })).then(RESULT => {
        console.log("*************App Version Mapped*************");
    }).catch(ERROR => {
        console.log("*************App Version Error**************");
    })
};
