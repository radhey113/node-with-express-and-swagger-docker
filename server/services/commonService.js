/**
 * Created by Radhey Shyam on 14/02/18.
 */

"use strict";
const commonFun     =     require("../util/commonFunction");
let FS              =     require("fs");
let CONFIG          =     require('../config');
var multer          =     require('multer');
let GM              = require('gm').subClass({imageMagick: true});

/**
 * Storage for file in local machine
 */ 
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/uploads/')
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname.split('.');
        let fileExtension = fileName[fileName.length-1];
        cb(null, Date.now() + '.' + fileExtension);
    }
});

/** Upload single file **/ 
const upload = multer({
    storage: storage
}).single('file');  


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
           console.log(REQUEST.file);
            let path = REQUEST.file.path;
            createImage(path).then(result => {
                console.log(result);
            });


            return resolve(path);
      });     
    })
}

/** Create image **/ 
let createImage = (originPath) => {
    
    return new Promise((resolve, reject) => {

        var readStream = FS.createReadStream(originPath);
            GM(readStream)
                .size({ bufferStream: true }, function (err, size) {
                    if (size) {
                        this.thumb(size.width, size.height, originPath, 10,
                        /* .autoOrient()
                        .write(thumbnailPath1,*/ function (err, data) {
                                err ? reject(err) : resolve(data);
                            })
                    }
                });
    });
}



/**
 * common model service exporting
 */
module.exports = commonService;
