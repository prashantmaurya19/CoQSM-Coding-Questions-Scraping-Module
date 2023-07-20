import uid from "../app/uid.js";
export default class Python {
    uid = uid.toUID("python");
    EXTENSION = ".py";
    BOILERPLATE = `
import time

def solver():
    #write you code here

def printExecutionTime(fun):
    start = time.time()
    fun()
    print("Execution Time",(time.time()-start)*10**3,'ms')


if __name__ == "__main__":
    printExecutionTime(solver)
    `;
    MULTI_LINE_COMMENT = ['"""', '"""'];
    getBody() {
        return this.BOILERPLATE;
    }
}
/**
 * @returns {Object<string,CPP|Python>}
*/