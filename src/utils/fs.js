import { QUESTIONDIR } from "../app/config.js";
import { WEBSITES, LANGUAGES } from "../app/mapping.js";
import { join } from "path";
import { logerror } from "../app/errors.js";
import * as fs from "fs";

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
    fs.mkdirSync(path, option);
}

/**
 * save the questions
 * @param {string} websiteName name of the site
 * @param {[string]} langs languages 
 * @param {string} title title
 * @param {string} body
*/
export function saveQuestion(websiteName, langs, title, body) {
    const site = WEBSITES.getWebsite(websiteName)
    let content = site.TEMPLATE
    .replace(getRegexForWord("title"), title)
    .replace(getRegexForWord("link"), body)
    .replace(getRegexForWord("date"), `${new Date().toLocaleString()}`)
    for (let i in langs) {
        const folderpath = join(`${QUESTIONDIR} ${websiteName}`,title,langs[i]);
        mkdirSync(folderpath);
        const lang = LANGUAGES.getLanguage(langs[i]);
        let file_content = content
            .replace('{{code}}', lang.getBody())
            .replace(getRegexForWord("commentStart"), lang.MULTI_LINE_COMMENT[0])
            .replace(getRegexForWord("commentEnd"), lang.MULTI_LINE_COMMENT[1]);
        try {
            lang.store(folderpath,file_content);
        } catch (error) {
            logerror(error.stack);
        }
    }
}

