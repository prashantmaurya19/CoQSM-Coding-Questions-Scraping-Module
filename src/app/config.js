import * as url from 'url';
import { join } from "path";
/**
 * CONFIGERATIONs
 * Important Note 🌟
 * don't change the variable ended by "dir"
 * you can change Vaiable which are ended by Names
*/

//path config
export const ROOTDIR = url.fileURLToPath(new URL('../..', import.meta.url));
/**
 * question dir name
 * @type {string}
*/
export const QUESTIONDIR_NAME = 'practise';
/**
 * question dir path
 * @type {string}
*/
export const QUESTIONDIR = join(ROOTDIR,QUESTIONDIR_NAME);

// database config
export const DB_FILE_NAME = 'record.db';
export const DB_FOLDER_NAME = 'data';
export const DB_FILE_PATH = join(ROOTDIR,DB_FOLDER_NAME,DB_FILE_NAME);

//typo config
export const FIGLET_FONT = 'doom';

//application config
export const WELCOME_STRING = 'Welcome to CoQSM ';


//testing 🧪
export const TESTDIR = join(ROOTDIR,'test')

