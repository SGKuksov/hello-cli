#!/usr/bin/env node
"use strict";
var packageInfo = require("./package.json");
var output = process.argv.slice(2);
if (output.join(" ") === "") {
    console.log("Usage: \n--help    Help documentation\n--version Installed package version");
}
if (output.join(" ") === "--help") {
    console.log(packageInfo.description);
}
if (output.join(" ") === "--version") {
    console.log(packageInfo.version);
}
