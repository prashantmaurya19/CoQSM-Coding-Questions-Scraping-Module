import plugins from "../../scraper.plugins.js";

/**
 * @returns {import("./type.js").LanguageMappingObject}
*/
function loadPlugings(plugins) {
    let res = {};
    for (const Lang of plugins) {
        res[Lang.uid] = Lang;
    }
    return res;
}

/**
 * @typedef {import("../Websites/Codeforces.js").default} Sites
 * @typedef {Object<string,Sites>} sitecollections
 * @type {sitecollections}
 * 
 * @exports Sites
*/
class Website {
    SITES = loadPlugings(plugins.website);
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
    LANGS = loadPlugings(plugins.language);
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