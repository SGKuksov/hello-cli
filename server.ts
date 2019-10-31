#!/usr/bin/env node

const packageInfo: any = require("./package.json");
const output: string[] = process.argv.slice(2);

if (output.join(" ") === "") {
console.log(`Usage: 
--help    Help documentation
--version Installed package version`);
}

if (output.join(" ") === "--help") {
  console.log(packageInfo.description);
}

if (output.join(" ") === "--version") {
  console.log(packageInfo.version);
}
