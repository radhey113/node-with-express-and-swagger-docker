
'use strict';

/*******************************
 *** MONGOOSE for connection ***
 *******************************/
let MONGOOSE   =  require('mongoose');


/*******************************
 ***** Mongodb connection  *****
 *******************************/
module.exports = (URL) => {
    return new Promise((resolve, reject) => {
        MONGOOSE.connect(URL, (err, response)=>{
            if(err)
                reject(err);
            else
                resolve(null);
        });    
    })
};

