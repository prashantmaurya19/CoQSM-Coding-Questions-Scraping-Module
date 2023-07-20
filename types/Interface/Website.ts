export default interface Website {
    uid: string;
    INQUIRER_KEY: string;
    INQUIRER_NAME: string;
    INQUIRER_VALUE: string;
    TAGS: string[];
    PROBLEM_LINK: string;
    TAG_SPECIFIER: string;
    TAG_SEPARATOR: string;
    URL_SPACE: string;
    TEMPLATE: string;
    getProblemUrl(...s: string[]): string;
}