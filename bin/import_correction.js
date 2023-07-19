#!/usr/bin/env node
import { log } from "../src/utils/typos.js";
import yargs from "yargs/yargs";
import { ROOTDIR } from "../src/app/config.js";
import { join } from "path";
import {
    existsSync,
    readFileSync,
    writeFileSync
} from "fs";

const args = yargs(process.argv).argv;
/**
 * @type {Object<string,[{from:string,to:string}]>}
*/
const corrections = {
    'src\\plugins\\Websites.js': [
        {
            from: "import { getProblemSiteUrl } from \"../Interface/Website\";",
            to: "import { getProblemSiteUrl } from \"../Interface/Website.js\";"
        },
        {
            from: "import uid from \"../app/uid\";",
            to: "import uid from \"../app/uid.js\";"
        }
    ],
    'src\\plugins\\Languages.js': [
        {
            from: "import uid from \"../app/uid\";",
            to: "import uid from \"../app/uid.js\";"
        }
    ],
    // 'src\\Interface\\Website.js': [
    //     {
    //         from: "import chalk from \"../../node_modules/chalk/source/index\";",
    //         to: "import chalk from \"chalk\";"
    //     }
    // ],
    'src\\app\\uid.js': [
        {
            from: "import chalk from \"../../node_modules/chalk/source/index\";",
            to: "import chalk from \"chalk\";"
        }
    ]
}

const fulfiled = {};
let hasduplicates = false;
for (const path in corrections) {
    if (fulfiled[path]) {
        log.red(`Path : ${path} is already processed`)
        hasduplicates = true;
    }
    fulfiled[path] = true;
}

if(hasduplicates) {
    log.redBright('Fix the above issue 👆')
    process.exit();
}

for (let path in corrections) {
    const fullpath = join(ROOTDIR, path);
    if (existsSync(fullpath)) {
        log.yellow(`${path.replace(ROOTDIR, ".\\")} is found!!`);
        let content = readFileSync(fullpath, 'utf-8');
        for (const target of corrections[path]) {
            content = content.replace(target.from, target.to);
        }
        writeFileSync(fullpath, content);
        log.greenBright(`${path.replace(ROOTDIR, ".\\")} import is corrected.`);
    }
}
