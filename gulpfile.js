var gulp = require('gulp');
const { parallel, src, dest } = require('gulp');
var ts = require('gulp-typescript');
var path = require("path");
var fs = require("fs");
var tsProject = ts.createProject('tsconfig.json');

function buildTS() {
    var tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(tsProject.config.compilerOptions.outDir));
}

function copyViews() {
    return src('src/views/*/*.*')
        .pipe(dest(tsProject.config.compilerOptions.outDir + "/views"));
}

function copyStatic() {
    return src('src/public/*/*.*')
        .pipe(dest(tsProject.config.compilerOptions.outDir + "/public"));
}


exports.default = parallel(buildTS, copyViews, copyStatic);