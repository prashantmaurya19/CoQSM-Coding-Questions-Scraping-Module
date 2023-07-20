import { getProblemSiteUrl } from "../utils/Website.js";
import uid from "../app/uid.js";
export default class Codeforces {
    uid = uid.toUID("codeforces");
    INQUIRER_KEY = "c";
    INQUIRER_NAME = "Codeforces";
    INQUIRER_VALUE = "codeforces";
    //config start
    TAGS = [
        '2-sat',
        'binary search',
        'bitmasks',
        'brute force',
        'chinese remainder theorem',
        'combinatorics',
        'constructive algorithms',
        'data structures',
        'dfs and similar',
        'divide and conquer',
        'dp',
        'dsu',
        'expression parsing',
        'fft',
        'flows',
        'games',
        'geometry',
        'graph matchings',
        'graphs',
        'greedy',
        'hashing',
        'implementation',
        'interactive',
        'math',
        'matrices',
        'meet-in-the-middle',
        'number theory',
        'probabilities',
        'schedules',
        'shortest paths',
        'sortings',
        'string suffix structures',
        'strings',
        'ternary search',
        'trees',
        'two pointers',
    ];
    PROBLEM_LINK = 'https://codeforces.com/problemset'; ////page/{{pagenumber}}';
    TAG_SPECIFIER = '?tags=';
    TAG_SEPARATOR = ',';
    URL_SPACE = "+";
    TEMPLATE = `{{commentStart}}
{{date}}

{{title}}

{{body}}
{{commentEnd}}
{{code}}
    `;
    /**
     * @param {number} pagenumber greater then 0
    */
    getProblemUrl(pagenumber, ...s) {
        if (isNaN(pagenumber) && parseInt(pagenumber) < 0) throw `${pagenumber} is not a page number`;
        return getProblemSiteUrl(this.PROBLEM_LINK, this.TAG_SPECIFIER, this.TAG_SEPARATOR, this.URL_SPACE, ...s).replace('{{pagenumber}}', pagenumber);
    }
}