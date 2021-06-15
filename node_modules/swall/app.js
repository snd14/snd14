#!/usr/bin/env node
'use strict'

const fs = require('fs');
const wallpaper = require('wallpaper');
const path = require('path');
const argv = require('yargs').option({
    interval : {
        // demand : true,
        alias:['i'],
        description: "Set Change Interval",
        type: 'string'
    }
}).help('help').alias('help','h').argv;

let images = [];

let time = 1 * 60000;

if(argv.i) {
    time = parseFloat(argv.i) * 60000;
}

let cdr = process.cwd();
fs.readdir(cdr,function(err, files){
    if (err) {
        return console.error(err);
    }
    if (files.length == 0){
       console.log("No Images Found");
    } else {
        files.forEach(function(file){
            console.log(file);
            images.push(file);
        });
        let i = 0;
        setInterval(function () {
            console.log(images.length);
            console.log(images[i]);
            console.log(i);

            wallpaper.set(path.join(cdr,images[i])).then(() => {
                console.log("Set");
                if(i==images.length-1) {
                    i = 0;
                } else {
                    i++;
                }
            });
        },time);
    }
});
