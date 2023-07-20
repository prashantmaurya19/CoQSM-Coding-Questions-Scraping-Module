//Languages plugins
import CPP from "./src/Languages/CPP.js";
import Python from "./src/Languages/Python.js";

//Website plugins
import Codeforces from "./src/Websites/Codeforces.js";

export default {
    language:[new CPP(), new Python()],
    website:[new Codeforces()]
}



