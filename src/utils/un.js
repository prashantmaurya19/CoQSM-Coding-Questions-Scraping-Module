import { log } from "./typos.js";
import { Page, Browser } from "puppeteer";
import { join } from "path";
import { TESTDIR } from "../app/config.js";
import { writeFile } from "fs/promises";

/**
 * @returns {Promise<void>}
*/
export function saveToTestdir(filename,content) {
   return writeFile(join(TESTDIR,filename), content,{encoding:"utf-8"});
}

export function pritify(o) {
    return JSON.stringify(o,null,'  ');
}

/**
 * @param {()=>[string]} listfunction 
 * @param {string} attr 
 * @param {import("../app/type.js").ArgumentsObject} args 
 * @param {string} msg 
 * @param {Array} q 
 * @param {RegExp} regex 
 * @param {string} spliter 
*/
export function createProptList(args, q, attr, regex, spliter, msg, listfunction) {
    let [choices,list_of_choices ]= listfunction();
    if (args[attr] != undefined && args[attr].match(regex)) {
        let arg = args[attr].split(spliter);
        let matched = [];
        for (const s of arg) {
            if (list_of_choices.includes(s.toLowerCase())) matched.push(s);
            else log.red(`${attr} option : ${s} is incorrect`);
        }
        if (matched.length > 0) {
            args[attr] = matched;
            return;
        }
    }
    q.push(
        {
            type: 'checkbox',
            name: attr,
            message: msg,
            choices,
            validate(value) {
                if (value.length < 1) {
                    return `You must choose at least one ${attr.toUpperCase()}.`;
                }
                return true;
            }
        }
    );
}

/**
 * @param {Page} page 
 * @param {string} name 
 * @returns {Promise<void>}
*/
export function takeScreenshot(page,name="screenshot.png") {
    return page.screenshot({path:join(TESTDIR,name),fullPage:true});
}


/**
 * async sleep 
 * @param {number} ms miliseconds
*/
export function sleep(ms) {
    return new Promise((res, re) => setTimeout(res, ms))
}