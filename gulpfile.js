/**
 * Created by lakshmi on 20/02/18.
 */

// npm install --save-dev gulp gulp-uglify
let gulp = require('gulp');
let gulp_Util = require('gulp-util');
let exec = require('child_process').exec;
let gls = require('gulp-live-server');

// create a default task and just log a message
gulp.task('default', function() {
    return gulp_Util.log('Gulp is running!')
});

/* start server using gulp*/
gulp.task('start', function() {
    var server = gls.new('server.js');
    return server.start();
});



