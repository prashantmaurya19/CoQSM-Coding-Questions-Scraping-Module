import {WEBSITES} from "../src/app/mapping.js";
import { log } from "../src/utils/TypoGraphy.js";

log.red(WEBSITES.getWebsite('codeforces').getProblemUrl(...WEBSITES.getWebsite('codeforces').TAGS), ';');


