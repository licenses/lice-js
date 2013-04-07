#! /usr/bin/env node

var license=require('../lice.js');

var fs=require("fs");
var async=require('async');
var exec = require('child_process').exec;
var template=require('../licenseTemplate.js');
var argsParser=require('./cliArgsParser.js');

var templates =require('../templates.json');
var config=require("../.config.json");

var getDefaults = function(callback){
    async.waterfall([
        function (callback){
            exec('git config --get user.name', function (err, stdout, stderr) {
                if (err) throw er;
                var gitUser=stdout;
                callback(err, gitUser);
            });
        },
        function (gitUser, callback){
            var defaults={
                year : config.year || new Date().getFullYear(),
                organization : config.organization || gitUser || process.env.USER, 
                project :  config.project || process.cwd().split("/").slice(-1)[0],
                licenseType : config.licenseType || 'bsd3'
            }
            callback(null, defaults);
        }
    ],
    function(err, result){
        callback(err,result);
    });
}

var showConfig=function(){
    console.log(config);
    process.exit(0);
}

var updateConfig= function(newConfigArgs){
    //CONJUDO: do this without __dirname???
    var configPath=__dirname + "/../.config.json";
    var newConfig=require("../.config.json");

    //set new config values in the crudest way possible.. CONJUDO: better way to do this?
    for (var i in newConfigArgs){
        newConfig[i]=newConfigArgs[i];
    }

    var updatedConfig=JSON.stringify(newConfig);
    fs.writeFile(configPath, updatedConfig, function (err) {
        if (err) throw err;
        console.log("config updated");
        showConfig();
     });
}

var runCli=function(args){

    async.series([
        function (callback){
            if (args.h) {
                return argsParser.optimist.showHelp();
            }
            else if (args.l) {
                console.log(license.licenseTypes());
            }
            //--vars goes here
            else callback(null);

        },
        function (callback){
            if (args.config) {
                if (args.config===true) {
                    showConfig();
                }
                else updateConfig(args.config)
            }
            else {
                  callback(null);              
            }
        },

        function (callback){
            var cleanUpArgs=function(args){
                return{
                    year : args.year,
                    organization : args.o,
                    project : args.project,
                    header : args.header,
                }
            }
            var licenseType= args._[0];
            var licenseOptions=cleanUpArgs(args);

           license.createLicense(licenseType, licenseOptions, function(err, license){
            if (args.header) console.log(license.header);
            else console.log(license.body);
           });

        },
    ]);
}

async.waterfall([
    function(callback){
        getDefaults(function (err,defaults){
            callback(null,defaults);
        });
    },
    function (defaults, callback){
        var args=argsParser.parseArgs(defaults);
        callback(null, args);
    },
    function(args,callback){
        runCli(args);
    }
]);    