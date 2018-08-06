/**
 * Created by Radhey Shyam on 14/02/18.
 */

"use strict";
const commonFun     =     require("../util/commonFunction");
let FS              =     require("fs");
let CONFIG          =     require('../config');
var multer          =     require('multer');
let Path            =     require('path');
var AWS             =     require("aws-sdk");
var mime            =     require('mime-types')
let GM              =     require('gm').subClass({imageMagick: true});
var FsExtra         =     require('fs-extra');


AWS.config.update({
    accessKeyId: CONFIG.awsConfig.accessKeyId,
    secretAccessKey: CONFIG.awsConfig.secretAccessKey,
    //  region:' '
});
var s3 = new AWS.S3();

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
const upload = multer({ storage: storage }).single('file');

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
        
        /** Upload pic locally first **/ 
        upload(REQUEST, RESPONSE, function (err) {
            if (err) {
              // An error occurred when uploading
                return reject(`Error: ${err}`);
            } 

           /** File data **/
            let fileData = REQUEST.file,
                fileName = fileData.originalname.split('.'),
                fileExtension = fileName[fileName.length-1];
                
                fileName = Date.now() + '.' + fileExtension;
            let path = fileData.path;
            
            /** Profile and thumb **/ 
            fileData.original = "profile_" + fileName;
            fileData.thumb = "thumbe_" + fileName;
            
            /** Thumbnail image **/ 
            let finalArray = [{
                path: Path.resolve('.') + '/client/uploads/' + fileData.thumb,
                finalUrl: CONFIG.awsConfig.s3URL + fileData.thumb,
            }]

            /** Profile image **/
            finalArray.push({
                path: fileData.path,
                finalUrl: CONFIG.awsConfig.s3URL + fileData.original
            })


          /** Create thumb image locally **/ 
          commonService.createThumbImage(path, finalArray[0].path).then(result => {

                let functionsArray = [];
                finalArray.forEach(function (obj) {
                    functionsArray.push(commonService.uploadFileS3(obj));
                });

                /** Upload image in s3 bucket **/
                return Promise.all(functionsArray).then(result => {                    
            
                    commonService.deleteFile(finalArray[0].path);
                    commonService.deleteFile(finalArray[1].path);

                    return resolve({
                        imgUrl: CONFIG.awsConfig.s3URL+fileData.original,
                        thumb: CONFIG.awsConfig.s3URL+fileData.thumb
                    });

                }).catch(error => {
                    throw error;
                })
                
          }).catch(error => {

                reject(error);
          });  
      });     
    })
}

/** Create image **/ 
commonService.createThumbImage = (originalPath, thumbnailPath) => {
    
    return new Promise((resolve, reject) => {
            
        var readStream = FS.createReadStream(originalPath);
            GM(readStream)
                .size({ bufferStream: true }, function (err, size) {
                    if (size) {
                        let height = 150;
                        let width = (size.width * height)/size.height;
                        this.thumb(width, height, thumbnailPath, 30,
                        /* .autoOrient()
                        .write(thumbnailPath1,*/ function (err, data) {
                            console.log(data);
                                err ? reject(err) : resolve(data);
                            })
                    }
                });
    });
}

/** Remove file  **/ 
commonService.deleteFile = (path) => {
    return FsExtra.remove(path);
}


/** Upload image to s3 bucket **/
commonService.uploadFileS3 = (fileObj) => {
    return new Promise((resolve, reject) => {

        var fileName = Path.basename(fileObj.finalUrl);
        var stats = FS.statSync(fileObj.path);

        var fileSizeInBytes = stats["size"];
    
          FS.readFile(fileObj.path, (err, fileData) => {
              s3.putObject({
               
                 Bucket: CONFIG.awsConfig.bucket,
                 Key: fileName,
                 Body: fileData,
                 ContentType: mime.lookup(fileName)
               
                }, (err, data) => {
               
                err ? reject(err): resolve(data);
               });
          });
    })
}



/**
 * common model service exporting
 */
module.exports = commonService;
