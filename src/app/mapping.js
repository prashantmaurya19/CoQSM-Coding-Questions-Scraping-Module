import WebsitesMapping, { Codeforces } from "../plugins/Websites.js";
import LanguagesMapping, { CPP, Python } from "../plugins/Languages.js";

//website mappings

/**
 * @typedef {Codeforces} Sites
 * @typedef {Object<string,Sites>} sitecollections
 * @type {sitecollections}
 * 
 * @exports Sites
*/
class Website {
    SITES = WebsitesMapping()
    /**
     * @returns {sitecollections}
    */
    getWebsites() {
        return this.SITES;
    }

    /**
     * verify the name of the site, 
     * if it invalid then it throw exception
     * @param {string} name name of site
    */
    verify(name) {
        if (this.getWebsites()[name] == undefined) throw `${name} is not a website`;
    }

    /**
     * return site
     * @param {string} name 
     * @returns {Sites}
    */
    getWebsite(name) {
        this.verify(name);
        return this.getWebsites()[name];
    }
};

class Language {
    /**
     * @typedef {CPP|Python} Langs
    */
    LANGS = LanguagesMapping()
    verify(name) {
        if (this.LANGS[name] == undefined) throw `${name} is not a valid language!!!`;
    }
    /**
     * @returns {Langs}
    */
    getLanguage(name) {
        this.verify(name);
        return this.LANGS[name];
    }
}

export const WEBSITES = new Website();
export const LANGUAGES = new Language();