#!/usr/bin/env node
import chalk from "chalk";
import yargs from "yargs/yargs";
import { QUESTIONDIR } from "../src/app/config.js";
import { join } from "path";
import { saveQuestion } from "../src/utils/fs.js";
import { removeInvalidTokens } from "../src/utils/un.js";
import plugins from "../scraper.plugins.js";
import {
    existsSync,
    readFileSync,
    writeFileSync
} from "fs";

const args = yargs(process.argv).argv;
const positionalArgumentErrorMsg = ['website name(if your own questions then what you like to say it)','title','tags','languages'];
/**
 * @typedef {Object<number,function(number,string|number,string):void>} VerificationObject
 * @type {VerificationObject}
*/
const verifyArgumentFunctions = {
    2:function (n,v,errmsg){
       if(v==undefined) throw chalk.red(`${errmsg} Not Found!` );
       if(typeof v !="string") throw chalk.red(`${errmsg} is not a string`);
    },
    3:function (n,v,errmsg){
       if(v==undefined) throw chalk.red(`${errmsg} Not Found!` );
       if(typeof v !="string") throw chalk.red(`${errmsg} is not a string`);
    },
    4:function (n,v,errmsg){
        if(v==undefined) throw chalk.red(`${errmsg} Not Found!` );
        if(typeof v !="string") throw chalk.red(`${errmsg} is not a string`);
        if(!v.match(/^[a-z]+(\,[a-z]+)*$/g)) throw chalk.red(`${v} invalid languages string!`);
        args._[n] = removeInvalidTokens(v.split(","),plugins.language.map((value)=>value.uid));
        if (args._[n].length==0) throw chalk.red(`No Valid Languages are found`);
    },
}

/**
 * @param {{_:[string],$0:string}} args 
 * @param {[string]} errormsg array of error msgs respected to arguments position
 * @param {VerificationObject} verificationfunction 
*/
function verifyArguments(args,errormsg,verificationfunction) {
    for(let index in verificationfunction){
        verificationfunction[index](parseInt(index),args._[index],errormsg[index]);
    }
}

verifyArguments(args,positionalArgumentErrorMsg,verifyArgumentFunctions);

saveQuestion(args._[2],args._[5],args._[3],"",args._[4]);