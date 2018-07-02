/**
 * Created by lakshmi on 14/02/18.
 */

'use strict';
let CONTROLLER      =   require("../../controller");
let auth            =   require("../../util/auth");


/** user routes **/
module.exports = (APP, PASSPORT)=>{

    APP.route('/api/register')
        .post(CONTROLLER.userController.registerUser);
        
    APP.route('/api/fileUpload')
        .post(CONTROLLER.userController.upload);

    APP.route('/api/login')
        .get(CONTROLLER.userController.loginUser);

    APP.route('/api/forgotPassword')
        .post(auth.userCheck, CONTROLLER.userController.forgotPassword);

    APP.route('/api/changePassword')
        .post(auth.userCheck, CONTROLLER.userController.changePassword);
};