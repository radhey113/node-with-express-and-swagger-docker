/**
 * Created by Radhey Shyam on 15/02/18.
 */

"use strict";

/******************************************
 ****** Default Server configuration ******
 ******************************************/
let serverConfig = {
    mongodb: {
        host        : "127.0.0.1",
        port        : 27017,
        name        : "mongodb",
        connector   : "mongodb",
        url         : process.env.dbUrl || "mongodb://127.0.0.1/demo_dev",
        database    : "demo_dev",
        user        : "",
        password    : "",
    },
    host    : "localhost",
    type    : "http://",
    port    : process.env.serverPort || '4000'
};


/***********************************
 ** Maintain server Configuration **
 **** according to env variable ****
 ***********************************/
if(process.env.NODE_ENV === "development"){
    
    serverConfig.mongodb.user           =   "";
    serverConfig.mongodb.password       =   "";
}
else if( process.env.NODE_ENV === "production"){

    serverConfig.mongodb.url            =   process.env.dbUrl || "mongodb://127.0.0.1:27017/demo";
    serverConfig.mongodb.database       =   "demo";
    serverConfig.mongodb.user           =   "";
    serverConfig.mongodb.password       =   "";
    serverConfig.port                   =   process.env.serverPort || "4001";
}

/** exporting server configuration **/
module.exports = serverConfig;



