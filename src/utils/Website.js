import chalk from "chalk";
/**
 * interface module for website
*/
/**
 * throw exception if tags is not valid
 * @param {[string]} tags
 * @param {string} tag
*/
export function verifyTags(tags, tag) {
    if (!tags.includes(tag))
        throw chalk.redBright(`${tag} is not a valid question tag!`);
}

/**
 * @returns {string}
*/
export function getProblemSiteUrl(problemlink, tag_spacifier, tags_separater, url_space, ...tags) {
    if (tags.length < 1)
        throw new Error("tags must required!!!");
    let link = problemlink + tag_spacifier;
    for (let tag in tags) {
        verifyTags(tags, tags[tag]);
        link = link.concat(((tag == `${tags.length - 1}`) ? tags[tag] : tags[tag].concat(tags_separater)).replaceAll(" ", url_space));
    }
    return link;
}
