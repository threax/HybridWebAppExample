"use strict";

var gulp = require("gulp");
var path = require('path');

var copy = require('threax-gulp-tk/copy.js');
var compileLess = require('threax-gulp-tk/less.js');
var compileJs = require('threax-gulp-tk/javascript.js');
var compileTypescript = require('threax-gulp-tk/typescript.js');

//Load library build modules
var hrBootstrapBuild = require('./node_modules/HtmlRapier.Bootstrap/build');
var jsonEditorBuild = require('./node_modules/HtmlRapier.json-editor/build');
var swaggerJsBuild = require('./node_modules/HtmlRapier.swagger-js/build');
var htmlRapier = require('./node_modules/HtmlRapier/build');
var htmlRapierWidgets = require('./node_modules/HtmlRapier.Widgets/build');

var webroot = "./wwwroot/";

gulp.task("default", function () {
    build();
});

gulp.task("debug", function () {
    var sharedSettings = {
        minify: false,
    };

    build(sharedSettings);
});

function build(sharedSettings) {
    if (sharedSettings === undefined) {
        sharedSettings = {};
    }

    if (sharedSettings.minify === undefined) {
        sharedSettings.minify = true;
    }

    if (sharedSettings.concat === undefined) {
        sharedSettings.concat = true;
    }

    var libDir = webroot + "lib/";

    //File Copy
    copy({
        libs: ["./node_modules/jsns/jsns.min.js"],
        baseName: './node_modules/jsns',
        dest: libDir
    });

    //Compile modules
    htmlRapier(__dirname, "./wwwroot/lib", sharedSettings);
    htmlRapierWidgets(__dirname, "./wwwroot/lib", sharedSettings);
    swaggerJsBuild(__dirname + '/node_modules/swagger-client/', __dirname + "/wwwroot/lib");
    jsonEditorBuild(__dirname + '/node_modules/json-editor/', __dirname + "/wwwroot/lib");
    hrBootstrapBuild(__dirname, __dirname + "/wwwroot/lib/", sharedSettings);

    //Client Side ts
    compileTypescript({
        libs: [
            __dirname + "/ClientLibs/**/*.ts",
        ],
        runners: false,
        dest: libDir,
        sourceRoot: __dirname + "/ClientLibs/",
        namespace: "clientlibs",
        output: "ClientLibs",
        concat: sharedSettings.concat,
        minify: sharedSettings.minify
    });

    //Views
    compileTypescript({
        libs: [
            __dirname + "/Views/**/*.ts",
            "!**/*.intellisense.js"
        ],
        runners: true,
        dest: libDir + '/views',
        sourceRoot: __dirname + "/Views"
    });
};