import { progress_spinner } from "./app/spinners.js";
/**
 * @typedef {{$0:string,_:[string],languages:string,tags:[string],site:string,no_of_questions:number}} ArgumentsObject
 * @type {ArgumentsObject}
*/
import { printErrors } from "./app/errors.js";
import puppeteer from 'puppeteer';
import chalk from "chalk";
import { processArguments } from "./app/cli_arguments.js";
import scrapers from "./app/scrapers.js";
import db from "./app/db.js";

(
    async function () {
        const args = await processArguments(); 
        const browser = await puppeteer.launch({
            headless: 'new',
        });
        const page = await browser.newPage();

        progress_spinner.start({text:'Processing 😶‍🌫️',color:"green"});

        const no_of_questions = await scrapers[args.site](page,browser);
        
        progress_spinner.stop({text:chalk.greenBright("Completed 😃"),mark:"✔️"})

        await browser.close();
        await db.save();
        printErrors();
    }
)()

