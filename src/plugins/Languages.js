import uid from "../app/uid.js";
export class CPP {
    uid = uid.toUID("cpp");
    EXTENSION = '.cpp';
    BOILERPLATE = `
int main(int argc, char const *argv[])
{
    //code    
    return 0;
}
    `;
    MULTI_LINE_COMMENT = ["/*", "*/"];
    getBody() {
        return this.BOILERPLATE;
    }
}
export class Python {
    uid = uid.toUID("python");
    EXTENSION = ".py";
    BOILERPLATE = `
#write you code here
    `;
    MULTI_LINE_COMMENT = ['"""', '"""'];
    getBody() {
        return this.BOILERPLATE;
    }
}
/**
 * @returns {Object<string,CPP|Python>}
*/
export default function () {
    let res = {};
    for (const Lang of [new CPP(), new Python()]) {
        res[Lang.uid] = Lang;
    }
    return res;
}
