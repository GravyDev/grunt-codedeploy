/*
 * grunt-codedeploy
 * https://github.com/dainbrump/grunt-codedeploy
 *
 * Copyright (c) 2015 Mark Litchfield
 * Licensed under the GPL-2.0 license.
 */

'use strict';

var AWS = require('aws-sdk');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('codedeploy', 'Codedeploy plugin for Grunt', function() {
    var options = this.options({
      aws:{},
      deploy: {
        deploymentConfigName: 'CodeDeployDefault.OneAtATime',
        ignoreApplicationStopFailures: true
      }
    });

    var error = false;
    if (!options.hasOwnProperty('aws')) {
      error = true;
      grunt.log.error('You must supply a options.aws object.');
    }
    if (!options.hasOwnProperty('deploy')) {
      error = true;
      grunt.log.error('You must supply a options.deploy object.');
    }

    if (!error) {
      var done = this.async();
      grunt.log.writeln('Executing CodeDeploy...');
      var codedeploy = new AWS.CodeDeploy(options.aws);
      //console.log(codedeploy);
      setTimeout(function() {
        codedeploy.createDeployment(options.deploy, function(err, data) {
          if (err) {
            grunt.log.error('Error');
            grunt.log.error(err);
            /*grunt.log.error(err.stack);*/
            done();
          } else {
            grunt.log.writeln('Success: '+ data.deploymentId);
            done();
          }
        });
      });
    }
  });

};
