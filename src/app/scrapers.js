import { progress_spinner } from "./spinners.js";
import { Page, Browser } from "puppeteer";
import { args } from "./cli_arguments.js";
import { log } from "../utils/typos.js";
import chalk from "chalk";
import { WEBSITES } from "./mapping.js";
import { sleep, takeScreenshot, pritify , saveToTestdir} from "../utils/un.js";
import db, { filterUniqueQuestions } from "./db.js";

const handler = {

    /**
     * @param {ScraperHolder} target 
     * @param {string} property 
    */
    get(target, property, reciver) {
        if (target[property] == undefined) throw chalk.red(`incorrect uid : ${property}`);
        return target[property].bind(target, WEBSITES.getWebsite(property));
    }
}

/**
 * @typedef {import("./type.js").CodeforcesProblemObject} CodeforcesProblemObject
*/


/**
 * @param {string} sitename 
 * @param {[CodeforcesProblemObject]} final slected questions
 * @param {[CodeforcesProblemObject]} current currently fected questions
 * @param {number} num how many left
*/
function pickQuestions(sitename, final, current, num) {
    const filterd = filterUniqueQuestions(sitename, current);
    return final.concat(filterd.splice(0, num - final.length));
}


/**
 * @typedef {import("./type.js").ScraperHolder} ScraperHolder
*/
const target = {
    /**
     * 
     * @param {import('./mapping.js').Sites} site
     * @param {Page} p
     * @param {Browser} b
    */
    codeforces: async function (site, p, b) {
        const getListQuestionsDom = () => {
            let nextarrowelement = document.querySelector(".pagination ul");
            nextarrowelement = nextarrowelement ? nextarrowelement.lastElementChild : null;
            const nextpagearrow = nextarrowelement==undefined || nextarrowelement.className=="inactive" ? null : nextarrowelement.firstElementChild.href;
            let rows = document.querySelectorAll(".problems > tbody tr");
            let res = [];

            for (let i = 1; i < rows.length; i++) {
                res.push({
                    title: rows[i].children[1].children[0].innerText,
                    link: rows[i].children[1].children[0].firstElementChild.href,
                });
            }
            res.push({link:nextpagearrow==undefined ? "" : nextpagearrow});
            return res;
        };

        const getQuestionContentDom = ()=>{
            for(const celement of document.querySelectorAll(".input-output-copier")){
                celement.remove();
            }

            for(const inputele of document.querySelectorAll('.input')){
                inputele.firstElementChild.insertAdjacentHTML("afterend","<div class = 'title'>&nbsp;</div>");
            }

            for(const outputele of document.querySelectorAll('.output')){
                outputele.firstElementChild.insertAdjacentHTML("afterend","<div class = 'title'>&nbsp;</div>");
            }

            
            let lines = document.querySelectorAll(".input .test-example-line-0"),count=0;
            while(lines!=undefined && lines.length>0){
                lines[lines.length-1].insertAdjacentHTML("afterend","<br>");
                count++;
                lines = document.querySelectorAll(`.input .test-example-line-${count}`);
            }

            return document.querySelector(".problem-statement").innerText;
        }

        progress_spinner.update({ text: `going to ${site.getProblemUrl(1,...args.tags)} 👌` });

        await p.goto(site.getProblemUrl(1, ...args.tags));

        let questionsarray = [];
        do {
            await p.waitForSelector(".problems > tbody tr");
            const result = await p.evaluate(getListQuestionsDom);
            const nextlink = result.pop();
            questionsarray = pickQuestions(site.uid,questionsarray,result,args.no_of_questions);
            progress_spinner.update({text:chalk.greenBright(`${questionsarray.length}/${args.no_of_questions} ${nextlink.link}`)});
            if(nextlink.link=="") break;
            await p.goto(nextlink.link);
        } while (questionsarray.length<args.no_of_questions);
        
        await saveToTestdir('list of questions.json', JSON.stringify(questionsarray));

        for(let question in questionsarray){
            // await takeScreenshot(p , `${site.uid} ${question} .png`);
            await p.goto(questionsarray[question].link);
            progress_spinner.update({text:chalk.green(`${question}/${questionsarray.length} : ${questionsarray[question].title} 👉 ${questionsarray[question].link} 👍`)})
            try {   
                await p.waitForSelector(".problem-statement",{timeout:7000});
            } catch (error) {
                progress_spinner.update({text:chalk.red(`${question}/${questionsarray.length} : ${questionsarray[question].title} 👉 ${questionsarray[question].link} 👎`)})
                continue; 
            }
            let content = await p.evaluate(getQuestionContentDom);
            content+=`\n\nlink 🔗 ${questionsarray[question].link} 🌟`;
            db.store(site.uid,args.languages,questionsarray[question].title,content);
        }
    }
}


/**
 * @type {ScraperHolder}
*/
export default new Proxy(target, handler);