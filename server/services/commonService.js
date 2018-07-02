/**
 * Created by lakshmi on 14/02/18.
 */

"use strict";
const commonFun     =     require("../util/commonFunction");
let fs              =     require("fs");
let CONFIG          =     require('../config');

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


/**
 *
 * @param FILE
 * @param CB
 */
commonService.fileUpload = (FILE, CB)=>{
    // FILE = FILE.split(",");
    // FILE = FILE[1];
    let imageSavePath = "client/uploads/trailerImages/trailer_"+Date.now()+".png",
    imagePath = "/uploads/abc_"+Date.now()+".png";
    /* upload file locally */
    fs.writeFile(imageSavePath, FILE, "base64" , function(err) {
        if (err)
            return CB(err);
        else {
           imagePath = CONFIG.dbConfig_Prods.type + CONFIG.dbConfig_Prods.host + ":" + CONFIG.dbConfig_Prods.port + imagePath;
           CB(null, imagePath);
        }
    });
};

/**
 * common model service exporting
 */
module.exports = commonService;
