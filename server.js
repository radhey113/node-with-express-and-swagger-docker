
'use strict';

let www = require('./bin/www.js');
let db  = require('./bin/dbConnection.js');
let dbConfig = require('./server/config/dbConfig');


db(dbConfig.mongodb.url).then(resolve => {
    console.log(`*********DB is connected successfully*********`);
    www();
}).catch(err => {
    console.log(`*********err*********  ${err}`);
});



