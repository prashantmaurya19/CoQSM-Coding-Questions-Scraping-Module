import db from "../src/app/db.js";

db.store('codeforces',['cpp','python'],'big jump',`
question descrition
is here 😄

but i dont know the question 🤒

this is for testing 🧪 purposes 😏 
`,`
Input 🗄️
1,2,3
6,4,2
`,
`
output 🧪
999
234
`)

db.save()