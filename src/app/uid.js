import chalk from "chalk";
class UID {
    uids = {};
    isUid(s) {
        return this.uids[s] == undefined;
    }
    storeUid(s) {
        if (this.isUid(s))
            this.uids[s] = new Date().toLocaleString();
        else
            throw chalk.red(`${s} is a UNIQUE IDENTITY name`);
    }
    toUID(s) {
        this.storeUid(s);
        return s;
    }
}
export default new UID();
