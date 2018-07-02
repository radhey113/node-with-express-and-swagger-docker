
/** mongodb connection **/
'use strict';

let MONGOOSE        =    require('mongoose');

module.exports = (URL) => {
    return new Promise((resolve, reject) => {
        MONGOOSE.connect(URL, (err, response)=>{
            if(err)
                reject(err);
            else
                resolve(null);
        });    
    })
}

