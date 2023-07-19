import { createProptList } from "../utils/un.js";
import yargs from "yargs/yargs";
/**
 * @typedef {import("./type.js").ArgumentsObject} ArgumentsObject
 * @type {ArgumentsObject}
*/
let args = yargs(process.argv).argv;
import { WEBSITES, LANGUAGES } from "./mapping.js";
import inquirer from "inquirer";
const questions = [];

if (typeof args.site != 'string' && WEBSITES.getWebsites()[args.site]==undefined) questions.push(
    {
        type: 'list',
        name: 'site',
        message: 'From Which Website you want Question ?',
        choices: (
            function () {
                let res = [];
                for (let lang in WEBSITES.getWebsites()) {
                    // res.push({
                    //     key: WEBSITES.SITES[lang].INQUIRER_KEY,
                    //     value: WEBSITES.SITES[lang].INQUIRER_VALUE,
                    //     name: WEBSITES.SITES[lang].INQUIRER_NAME
                    // });
                    res.push(WEBSITES.SITES[lang].INQUIRER_VALUE);
                }
                return res;
            }
        )()
    }
)

if (isNaN(args.no_of_questions)) questions.push(
    {
        type: 'input',
        name: 'no_of_questions',
        message: "How Mush Questions you want to fetch ?",
        validate(value) {
            if(typeof value == "number" && value > 0) return true;
            return 'Questions number must be greater then 0';
        },
        filter(value){
            return (isNaN(value)) ? value : parseInt(value);
        }

    }
);
else{
    args.no_of_questions = parseInt(args.no_of_questions);
}


createProptList(args, questions, 'languages', /^[a-z]+(\,[a-z]+)+$/g, ',', 'Select Languages :', function () {
    let choices = [];
    let raw = [];
    for (let lang in LANGUAGES.LANGS) {
        choices.push({
            name: lang
        });
        raw.push(lang);
    }
    return [choices , raw];
});

/**
 * this is important for processing and to get all the argument
 * @async
 * @function
 * @returns {Promise<ArgumentsObject>}
*/
export async function processArguments(){
        if(args.tags instanceof Array ) return args;

        args = {
            ...args,
            ...await inquirer.prompt(questions)
        };

        let lastquestion = [];

        createProptList(args,lastquestion,'tags',/^[a-z0-9\s-]+(\,[a-z0-9\s-]+)*$/g,',','Select Tags :',function (){
            let choices = [];
            for(const tag of WEBSITES.getWebsite(args.site).TAGS){
                choices.push({
                    name:tag
                });
            }
            return [choices, WEBSITES.getWebsite(args.site).TAGS];
        });

        args = {
            ...args,
            ...await inquirer.prompt(lastquestion)
        };

        return args;
}

export {args};