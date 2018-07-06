
'use strict';

/********************************
 **** Managing all the routes ***
 ********* independently ********
 ********************************/
module.exports = function(app){
    require("./v1")(app)
};
