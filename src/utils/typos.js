import figlet from "figlet";
import gs from 'gradient-string';
import chalk from "chalk";
import { FIGLET_FONT } from "../app/config.js";
/**
 * @typedef {import("../app/type.js").FigletString} FigletString
 * @typedef {import("../app/type.js").GradientFigletString}  GradientFigletString
*/

const target = {};

const handler2 = {
    get(target, prop, receiver) {
        if(chalk[prop]==undefined) return console.log;
        else return (...v)=>{
            let s = [];
            for(const p of v){
                s.push(chalk[prop](p));
            }
            console.log(...s);
        };
    },
};

/**
 * @type {import("chalk").ChalkInstance}
*/
export const log = new Proxy(target, handler2);

/**
 * convert string to figlet sring
 * @param {string} msg 
 * @param {string} font figlet font
 * @returns {FigletString}
*/
export function getFigletText(msg, font = FIGLET_FONT) {
    return figlet.textSync(msg, { font: font });
}

/**
 * converts the string to gradient figlet string 
 * @param {string} msg message you want to convert
 * @returns {GradientFigletString}
*/
export function getFigletTextWithGradient(msg) {
    return gs.rainbow(getFigletText(msg));
}


/**
 * converts the string to figlet string or gradient figlet string 
 * if gradient option is true and logs to the console.
 * @param {string} msg
 * @param {boolean} gradient 
*/
export function showFigletText(msg, gradient = true) {
    console.log(gradient ? getFigletTextWithGradient(msg) : getFigletText(msg));
}