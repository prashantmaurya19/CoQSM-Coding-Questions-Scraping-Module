import { pritify } from "../utils/un.js";
import { log } from "../utils/typos.js";
import chalk from "chalk";
const errors = {};

export function genString(char, num) {
   let s = char;
   for (let i = 1; i < num; i++) {
      s += char;
   }
   return s;
}

/**
 * splits an string into fixed length lines.
 * @param {string} s 
 * @param {number} num length of the lines
 * @returns {[string]}
*/
export function splitWithFixedLength(s, num) {
   // return s.match(RegExp(`.{${num}}`, 'g'));
   return s.split(/\n\r|\n|\r/g);
}

/**
 * @param {string} key 
 * @param {string} err 
 * @returns {string}
*/
function printError(key, err) {
   let lines = splitWithFixedLength(err, 10);
   lines[0] =`${chalk.cyan(key)} :${chalk.red(lines[0])}`;
   for(let i = 1;i<lines.length;i++){
      lines[i] = `${genString(' ',key.length+2)}${chalk.red(lines[i].trim())}`;
   }
   return lines.join("\n");
}

export function logerror(msg) {
   errors[new Date().toLocaleString()] = msg;
}

export function printErrors() {
   if(Object.keys(errors).length==0) {
      return;
   }
   for(let key in errors){
      console.log(printError(key,errors[key]),'\n');
   }
}