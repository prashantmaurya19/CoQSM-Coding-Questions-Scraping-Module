import { log } from "./typos.js";
import { Page, Browser } from "puppeteer";
import { join } from "path";
import { TESTDIR } from "../app/config.js";
import { writeFile } from "fs/promises";

/**
 * @returns {Promise<void>}
*/
export function saveToTestdir(filename, content) {
    return writeFile(join(TESTDIR, filename), content, { encoding: "utf-8" });
}

export function pritify(o) {
    return JSON.stringify(o, null, '  ');
}

/**
 * remove items from inputtokens array which are not present in the legaltokens array
 * @param {[string]} inputtokens 
 * @param {[string]} legaltokens 
 * @returns {[string]}
*/
export function removeInvalidTokens(inputtokens, legaltokens) {
    let matched = [];
    for (const s of inputtokens) {
        if (legaltokens.includes(s.toLowerCase())) matched.push(s);
        else log.red(`${s} is incorrect`);
    }
    return matched;
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
    let [choices, list_of_choices] = listfunction();
    if (args[attr] != undefined && args[attr].match(regex)) {
        let arg = args[attr].split(spliter);
        const matched = removeInvalidTokens(arg,list_of_choices);
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
export function takeScreenshot(page, name = "screenshot.png") {
    return page.screenshot({ path: join(TESTDIR, name), fullPage: true });
}


/**
 * async sleep 
 * @param {number} ms miliseconds
*/
export function sleep(ms) {
    return new Promise((res, re) => setTimeout(res, ms))
}