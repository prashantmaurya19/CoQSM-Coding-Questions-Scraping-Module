/**
 * this module is not provide any database property
 * it is use for managing the data into the file
*/
import fs from "fs";
import pfs from "fs/promises";
import { join } from "path";
import { ROOTDIR, DB_FOLDER_NAME, DB_FILE_PATH } from "./config.js";
import { mkdirSync, saveQuestion} from "../utils/fs.js";
import { WEBSITES } from "./mapping.js";

mkdirSync(join(ROOTDIR, DB_FOLDER_NAME), { recursive: true });

class Database {
    default = {}
    /**
     * @typedef {import("./type.js").DatabaseObject} DatabaseObject
     * @typedef {import("./type.js").DatabaseQuestionsCollection} DatabaseQuestionsCollection
    */

    constructor(filepath) {
        this.load(filepath);
    }

    /**
     * @returns {DatabaseQuestionsCollection}
    */
    getWebsiteCollection(websiteName) {
        WEBSITES.verify(websiteName);
        if (this.db[websiteName] == undefined) this.db[websiteName] = {};
        return this.db[websiteName];
    }

    storeQuestionToDB(websiteName, title) {
        this.getWebsiteCollection(websiteName)[title] = new Date().toLocaleString();
    }

    /**
     * store the question to db and to the practise folder
     * @param {string} websiteName name of the site
     * @param {[string]} langs languages 
     * @param {string} title title
     * @param {string} body
    */
    store(websiteName, langs , title, body) {
        this.storeQuestionToDB(websiteName, title);
        saveQuestion(websiteName, langs, title.replace(/[\?\!,\\/@#\$%\^&\*]/g,'_'), body);
    }

    /**
     * loads the file data
     * and save the file path
    */
    load(filepath) {
        this.filepath = filepath;
        /**
         * @type {DatabaseObject}
        */
        this.db = (fs.existsSync(filepath)) ? JSON.parse(fs.readFileSync(filepath, 'utf-8')) : structuredClone(this.default);
    }

    /**
     * @returns {Promise<void>}
    */
    save() {
        return pfs.writeFile(this.filepath, JSON.stringify(this.db,null,"  "),{encoding:"utf-8"});
    }
}

const db = new Database(DB_FILE_PATH);

/**
 * return true if title is already present in the collection
 * @param {string} sitename website name
 * @param {string} title title of the question
 * @returns {boolean}
*/
export function isQuestionNotPresent(sitename,title) {
   return db.getWebsiteCollection(sitename)[title]==undefined;
}

/**
 * @typedef {import("./type.js").CodeforcesProblemObject} CodeforcesProblemObject
 * return a filtered array of unique unfetched questions
 * @param {string} sitename website name
 * @param {[CodeforcesProblemObject]} questions array of questions
*/
export function filterUniqueQuestions(sitename,questions) {
    return questions.filter((value)=>{
        return isQuestionNotPresent(sitename,value.title);
    });
}

export default db;
