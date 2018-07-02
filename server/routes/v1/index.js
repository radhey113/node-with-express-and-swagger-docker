
'use strict';

module.exports = function(app, passport){
    require("./userRoutes")(app, passport)
};
