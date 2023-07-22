import chalk from "chalk";
/**
 * this module has all the types declarations
 * @typedef {{title:string,link:string}} CodeforcesProblemObject
 * @typedef {Object<string,(p:Page,b:Browser)=>Promise<number>>} ScraperHolder
 * @typedef {Object<string,string>} DatabaseQuestionsCollection
 * @typedef {Object<string,DatabaseQuestionsCollection>} DatabaseObject
 * @typedef {string} FigletString
 * @typedef {string} GradientFigletString
 * @typedef {{$0:string,_:[string],languages:string,tags:[string],site:string,no_of_questions:number}} ArgumentsObject
 * @typedef {Object<string, {
 *      uid:string,
 *      EXTENSION:string,
 *      BOILERPLATE:string,
 *      MULTI_LINE_COMMENT:[string,string],
 *      getBody:function():string
 * }>} LanguageMappingObject
*/


export function dummy() {
    throw chalk.red('dummy function don"t call it');
}