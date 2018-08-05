/**
 * express server setup
 */

'use strict';

/***********************************
 **** node module defined here *****
 ***********************************/
const EXPRESS      = require("express");
const BODY_PARSER  = require("body-parser");
const ALLFILES     = require("./../filebundle");
const SWAGGER      = require('./swagger/swagger_lib/swagger-express');
const PATH         = require("path");
const BOOTSTRAPING = require("../server/util/Bootstraping/Bootstraping");


/**creating express server app for server */
const app         = EXPRESS();


/********************************
 ***** Server Configuration *****
 ********************************/
    app.set('port', process.env.PORT || ALLFILES.CONFIG.dbConfig.port);
    app.set('swagger_views', __dirname + '../swagger_views');
    app.set('view engine', 'jade');
    app.use(EXPRESS.static("client"));
    app.use(BODY_PARSER.json({limit: '50mb'}));
    app.use(BODY_PARSER.urlencoded({ limit: '50mb', extended: true }));

    /** middleware for api's logging with deployment mode */
    let apiLooger = (req, res, next)=>{
            ALLFILES.COMMON_FUN.messageLogs(null, `api hitted ${req.url} ${ process.env.NODE_ENV}`);
            next();
    };

    /** Used logger middleware for each api call **/
    app.use(apiLooger);

    /*******************************
     *** For handling CORS Error ***
     *******************************/
    app.all('/*', (REQUEST, RESPONSE, NEXT) => {
        RESPONSE.header('Access-Control-Allow-Origin', '*');
        RESPONSE.header('Access-Control-Allow-Headers','Content-Type, api_key, Authorization, x-requested-with, Total-Count, Total-Pages, Error-Message');
        RESPONSE.header('Access-Control-Allow-Methods','POST, GET, DELETE, PUT, OPTIONS');
        RESPONSE.header('Access-Control-Max-Age',1800);
        NEXT();
    });

/*******************************
 **** Swagger configuration ****
 *******************************/
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


/*******************************
 ****** initializing routes ****
 *******************************/
require('../server/routes')(app);


/** server listening */
module.exports = () => {

    /*******************************
     ****** Admin Bootstrapping ****
     *******************************/
    BOOTSTRAPING.bootstrapAdmin((ERR, RESULT)=>{
        if(ERR){
            ALLFILES.COMMON_FUN.messageLogs(ERR.message, null);
            process.exit(0);
        }else{
            ALLFILES.COMMON_FUN.messageLogs(null, "**************Bootstraping done**************");
        }
    });

    /*******************************
     ****** Version Controller* ****
     *******************************/
    BOOTSTRAPING.bootstrapAppVersion();


    /** Server is running here */
    app.listen(ALLFILES.CONFIG.dbConfig.port, ()=>{
        ALLFILES.COMMON_FUN.messageLogs(null, `**************Server is running on ${ALLFILES.CONFIG.dbConfig.port} **************`);
    });
};



