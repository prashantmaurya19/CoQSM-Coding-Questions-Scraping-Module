## CoQSM (Coding Questions Scraping Module)

this module is created for scraping coding questions from diffrent websites. and Store them into a seprate Coding folder so that 
you don't need use online website's code enviroment to submit your code

and i know the name is extra fancy 😎

I don't know if its helps to anyone but take it 
if its helps you

**You can run your code in your enviroment 😄**

this project is integrable with your Compatative
codeing enviroment

because its just a node project , you need to know 
Node js, typescript to implement your own plugins

## Important area to focus!
if you really want to know about this module 
then from here its starts 🚶‍♂️

### Folder Structure

folder structure is looking wired\
but i include only important folders and file\
in below 👇 folder structure 📁 

```
--bin
    import_correction.js
--types
    Interface.ts
    --Websites
    --Languages
scraper.plugins.js
```

#### Lets starts with Explaing Folders

1. bin Folder\
as we know npx scripts are present there \
we use import_correction script to correct the imports\,
Because by default Typescript does't converts the imports
so when you compile .ts file then the imports will not work , we see how to use this script FIXME:

2. types Folder\
this folder contains typescript file (**I Used Typescript\
 for only one reason to use Interface**)

3. Websites\
this folder have your all websites Plugings \
**Note 1: don't Name your File CPP,Python , Because i Already Implemented those if you want to change some into them then goto 'src\Websites' change javascript file directly** \
**Note 2: Please implement the Website Interface to your\
pluging class , its helps you to implement them**

4. Languages\
**same as Websites Folder but for Language Plugins**

#### Folder Explaination is finished Let's move on to the files

1. import_correction.js \
this scripts is a relif of your pain to fix all the imported javascript files.\
this scripts replaces import with correct imports , when you open this script you find **corrections** Object
which has folder path as keys and replace values as Value,
you can understand by the looking to the corrections Object work .\
you don't need to call this script because its automaticaly called when to run command 'npm compile'.\
**Note that you need first place all your import correction in the file then run the command**

2. Interface.ts\
this file contains two Interfaces Website and Language

3. scraper.plugins.js\
this file has your plugins , but you don't need to edit it\
because your plugins are automatically imported by this file.\
**But you need to place them in the Correct Folder,\
you are using npm complie command then its already done for you, you don't to do any thind**

**That all about the Files and the folders**

### Now let's talk about commands
| command | description|
|---------|------------|
|`npm run compile` | compile the typescript files
|`npm start -- `[\<args>] | starts the script

#### npm start Arguments
after you write npm start -- \
here are some arguments you could like to pass

| argument | values |
|:-------:|:-------|
|`--site <sitename>`    | name of site you want to use (**You can not use more than one website**)|
|`--no_of_questions <number>`| number of questions you want to fetch
|`--tags <tags>`| name of tags separate by "," if you are using space between tags then wraper tags with double quotes "\<tags>"
|`--languages <languages>`| same as tags , but use language in place of tags , usage is same as tags


















