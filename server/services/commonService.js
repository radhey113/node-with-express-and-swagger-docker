/**
 * Created by Radhey Shyam on 14/02/18.
 */

"use strict";
const commonFun     =     require("../util/commonFunction");
let FS              =     require("fs");
let CONFIG          =     require('../config');
var multer          =     require('multer');
var upload          =     multer({ dest: './client/uploads/' }).single('file');


let commonService = {};
/**
 * @param model mongodb model
 * @param criteria  criteria for data finding
 * @param projection projection for filtering data according to requirement
 * @param callback return function
 */
commonService.find = (model, criteria, projection, callback)=>{
    model.findOne(criteria, projection, (err, result)=>{
        if(err)
            return callback(commonFun.sendError(err));
        else
            return callback(null, commonFun.sendSuccess(result));
    })
};


/** Upload file **/ 
commonService.fileUpload = (REQUEST, RESPONSE) => {
    return new Promise((resolve, reject) => {
        
        upload(REQUEST, RESPONSE, function (err) {
            if (err) {
              // An error occurred when uploading
                return reject(`Error: ${err}`);
            }  
           // No error occured.
            let path = REQUEST.file.path;
            return resolve(path);
      });     
    })
}

/**
 * common model service exporting
 */
module.exports = commonService;
