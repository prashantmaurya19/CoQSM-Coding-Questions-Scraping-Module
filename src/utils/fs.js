import { ROOTDIR, QUESTIONDIR } from "../app/config.js";
import { WEBSITES, LANGUAGES } from "../app/mapping.js";
import { join } from "path";
import { logerror } from "../app/errors.js";
import * as fs from "fs";
import { args } from "../app/cli_arguments.js";

function getRegexForWord(word) {
    return new RegExp(`\\{\\{\\s*${word}\\s*\\}\\}`, 'g');
}

/**
 * creates dir if the path is not exists
 * @param {string} path path
 * @param {{recursive: boolean}} option fs.mkdirSync(option)
*/
export function mkdirSync(path, option = { recursive: true}) {
    if (!fs.existsSync(path)) 
    fs.mkdirSync(path, {recursive:true});
}

//creating folder which a required
mkdirSync(QUESTIONDIR);

/**
 * save the questions
 * @param {string} websiteName name of the site
 * @param {[string]} langs languages 
 * @param {string} title title
 * @param {string} body
 * @param {string} input 
 * @param {string} output 
*/
export function saveQuestion(websiteName, langs, title, body) {
    const site = WEBSITES.getWebsite(websiteName)
    let content = site.TEMPLATE
    .replace(getRegexForWord("title"), title)
    .replace(getRegexForWord("body"), body)
    .replace(getRegexForWord("date"), `${new Date().toLocaleString()}`)
    for (let i in langs) {
        mkdirSync(join(QUESTIONDIR, websiteName,args.tags.join(" "),title,langs[i]));
        const lang = LANGUAGES.getLanguage(langs[i]);
        let file_content = content
            .replace('{{code}}', lang.getBody())
            .replace(getRegexForWord("commentStart"), lang.MULTI_LINE_COMMENT[0])
            .replace(getRegexForWord("commentEnd"), lang.MULTI_LINE_COMMENT[1]);
        try {
            fs.writeFileSync(join(QUESTIONDIR, websiteName,args.tags.join(" "), title,langs[i], `Question${lang.EXTENSION}`), file_content, { encoding: "utf-8" });
        } catch (error) {
            logerror(error.stack);
        }
    }
}

