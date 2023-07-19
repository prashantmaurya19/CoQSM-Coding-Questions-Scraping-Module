import { pritify } from "../utils/un.js";
import { log } from "../utils/typos.js";
const errors = {

};

export function logerror(msg) {
   errors[new Date().toLocaleString()] = msg; 
}

export function printErrors() {
   log.redBright(pritify(errors)); 
}