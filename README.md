# grunt-codedeploy

> Codedeploy plugin for Grunt

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-codedeploy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-codedeploy');
```

## The "codedeploy" task

### Overview
In your project's Gruntfile, add a section named `codedeploy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  codedeploy: {
    your_target: {
      options: {
        aws: {
          // See the section labeled "AWS Options" for more information
        },
        deploy: {
          // See the section labeled "CodeDeploy Options" for more information
          applicationName: 'STRING_VALUE', /* required */
          deploymentConfigName: 'STRING_VALUE',
          deploymentGroupName: 'STRING_VALUE',
          description: 'STRING_VALUE',
          ignoreApplicationStopFailures: true || false,
          revision: {
            gitHubLocation: {
              commitId: 'STRING_VALUE',
              repository: 'STRING_VALUE'
            },
            revisionType: 'S3 | GitHub',
            s3Location: {
              bucket: 'STRING_VALUE',
              bundleType: 'tar | tgz | zip',
              eTag: 'STRING_VALUE',
              key: 'STRING_VALUE',
              version: 'STRING_VALUE'
            }
          }
        }
      },
    }
  },
});
```

### AWS Options

This is an object that corresponds to the [AWS::Config](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property) object.
The minimum required values described in the link above is necessary. Refer to
that document as the authority for what data should go in this section.

### CodeDeploy Options

This part section of the codedeploy options contains an object that corresponds
to the params object for the [CodeDeploy::createDeployment](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CodeDeploy.html#createDeployment-property) method.
See the examples below for more details.

### Usage Examples

#### Default Options
In this example, we have two targets - production and stage. Production stores the deployable app as a tarball in S3 and stage relies on a github repository.

```js
grunt.initConfig({
  codedeploy: {
    production: {
      options: {
        aws: {
          accessKeyId: 'ProductionAccessKeyId',
          secretAccessKey: 'ProductionSecretAccessKey',
          region: 'us-east-1' // Default
        },
        deploy: {
          applicationName: 'My-Awesome-App-Production',
          deploymentGroupName: 'AwesomeApp-Group',
          revision: {
            revisionType: 'S3',
            s3Location: {
              bucket: 'awesome.app.bucket',
              bundleType: 'tgz',
              key: 'deploys/app-0.0.1.tar.gz',
            }
          }
        }
      }
    },
    stage: {
      options: {
        aws: {
          accessKeyId: 'StageAccessKeyId',
          secretAccessKey: 'StageSecretAccessKey',
          region: 'us-east-1' // Default
        },
        deploy: {
          applicationName: 'My-Awesome-App-Stage',
          deploymentGroupName: 'AwesomeApp-Group',
          revision: {
            revisionType: 'GitHub',
            gitHubLocation: {
              commitId: 'SHA-1 Commit Id',
              repository: 'account/reponame'
            },
          }
        }
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
