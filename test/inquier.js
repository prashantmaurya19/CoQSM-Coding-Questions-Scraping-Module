import inquirer from 'inquirer';

console.log('Hi, welcome to Node Pizza');

const questions = [
    {
        type: 'checkbox',
        message: 'Select toppings',
        name: 'toppings',
        choices: [
            new inquirer.Separator(' = The Meats = '),
            {
                name: 'Pepperoni',
            },
            {
                name: 'Ham',
            },
            {
                name: 'Ground Meat',
            },
            {
                name: 'Bacon',
            },
            new inquirer.Separator(' = The Cheeses = '),
            {
                name: 'Mozzarella',
                checked: true,
            },
            {
                name: 'Cheddar',
            },
            {
                name: 'Parmesan',
            },
            new inquirer.Separator(' = The usual ='),
            {
                name: 'Mushroom',
            },
            {
                name: 'Tomato',
            },
            new inquirer.Separator(' = The extras = '),
            {
                name: 'Pineapple',
            },
            {
                name: 'Olives',
                disabled: 'out of stock',
            },
            {
                name: 'Extra cheese',
            },
        ],
        validate(answer) {
            if (answer.length < 1) {
                return 'You must choose at least one topping.';
            }

            return true;
        },
    },
    {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: ['Large', 'Medium', 'Small'],
        filter(val) {
            return val.toLowerCase();
        },
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate(value) {
            const valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
    },
    {
        type: 'rawlist',
        name: 'beverage',
        message: 'You also get a free 2L beverage',
        choices: ['Pepsi', '7up', 'Coke'],
    },
    {
        type: 'input',
        name: 'comments',
        message: 'Any comments on your purchase experience?',
        default: 'Nope, all good!',
    },
    {
        type: 'list',
        name: 'prize',
        message: 'For leaving a comment, you get a freebie',
        choices: ['cake', 'fries'],
        when(answers) {
            return answers.comments !== 'Nope, all good!';
        },
    },
];

const myquestion = [
    {
        type: 'list',
        name: 'prize',
        message: 'For leaving a comment, you get a freebie',
        choices: ['cake', 'fries'],
        when(answers) {
            console.log(answers);
            return answers.comments !== 'Nope, all good!';
        },
        validate(a) {
            console.log(a);
            return true;
        }
    },
    {
        type: 'editor',
        name: 'bio',
        message: 'Please write a short bio of at least 3 lines.',
        validate(text) {
            if (text.split('\n').length < 3) {
                return 'Must be at least 3 lines.';
            }

            return true;
        },
        waitUserInput: true,
    },
]

inquirer.prompt(questions).then((answers) => {
    console.log('\nOrder receipt:');
    console.log(JSON.stringify(answers, null, '  '));
});