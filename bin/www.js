/**
 * express server setup
 */

'use strict';

/**node module defined here */
const EXPRESS     = require("express");
const BODY_PARSER = require("body-parser");
const ALLFILES    = require("./../filebundle");
const MONGOOSE    = require('mongoose');
const PASSPORT    = require("passport");
const SWAGGER     = require('./swagger/swagger_lib/swagger-express');
const api         = require('./../api');
const PATH        = require("path");
const BOOTSTRAPING= require("../server/util/Bootstraping/Bootstraping");
let lengthOfColor = ALLFILES.CONFIG.swaggerConfig.colors.length;


/**creating express server app for server */
const app         = EXPRESS();


/** configure app **/
    app.set('port', process.env.PORT || ALLFILES.CONFIG.dbConfig.port);
    app.set('swagger_views', __dirname + '../swagger_views');
    app.set('view engine', 'jade');
    app.use(EXPRESS.static("client"));
    app.use(BODY_PARSER.json({limit: '50mb'}));
    app.use(BODY_PARSER.urlencoded({ limit: '50mb', extended: true }));
    app.use(PASSPORT.initialize());
    app.use(PASSPORT.session());


    /** middle ware for api's */
    let apiLooger = (req, res, next)=>{
            let randomNumber= Math.floor(Math.random()*lengthOfColor);
            console.log(ALLFILES.CONFIG.swaggerConfig.colors[randomNumber],`api hitted`,  req.url,   process.env.NODE_ENV);
            next();
    };


    app.use(apiLooger);
    app.all('/*', (REQUEST, RESPONSE, NEXT) => {
        RESPONSE.header('Access-Control-Allow-Origin', '*');
        RESPONSE.header('Access-Control-Allow-Headers','Content-Type, api_key, Authorization, x-requested-with, Total-Count, Total-Pages, Error-Message');
        RESPONSE.header('Access-Control-Allow-Methods','POST, GET, DELETE, PUT, OPTIONS');
        RESPONSE.header('Access-Control-Max-Age',1800);
        NEXT();
    });


    app.use(SWAGGER.init(app, {
        apiVersion: '1.0',
        swaggerVersion: '1.0',
        basePath: "http://" + ALLFILES.CONFIG.dbConfig.host + ":" +ALLFILES.CONFIG.dbConfig.port,
        swaggerURL: '/api_documentation',
        swaggerJSON: '/api-docs.json',
        swaggerUI: './swagger/swagger_dependencies/swagger',
        apis: [
            PATH.join(__dirname, '/swagger/swagger_Routes/user.js'),
        ]
    }));
    app.use(EXPRESS.static(PATH.join(__dirname, 'swagger/swagger_dependencies')));


/* initializing routes */
require('../server/util/passport')(PASSPORT);
require('../server/routes')(app, PASSPORT);


/** making middleware for serer listen log */
let loggerFunction = ()=> {

    BOOTSTRAPING.bootstrapAdmin((ERR, RESULT)=>{
       if(ERR){
           console.log(ERR.message);
       }else{
           console.log("**************Bootstraping done**************");
       }
    });

    /** Mapping app version... **/
    BOOTSTRAPING.bootstrapAppVersion();

    console.log(`server is ruuning on `, ALLFILES.CONFIG.dbConfig.port);
};


/** server listening */
module.exports = () => {
    console.log(`******** mongodb is connected ********`, process.env.NODE_ENV);
    app.listen(ALLFILES.CONFIG.dbConfig.port, loggerFunction);
};



