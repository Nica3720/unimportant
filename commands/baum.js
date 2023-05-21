const { CommandType} = require('wokcommands')
// weil dann der ganze Definitionskrams wegfällt...
module.exports =  {
    description: "asdasdasdasdyeet",
    type: CommandType.SLASH,
    options: [
        {
            name: 'test',
            description: 'test',
            type: 3,
            required: true,
        },
        {
            name: 'test2',
            description: 'test2',
            type: 3,
            required: true,
            choices: [
                {
                    name: 'test2',
                    value: 'test2'
                },
                {
                    name: 'test3',
                    value: 'test3'
                },
                // festgelegte Antworten in Option
            ]
        }
    ],
    testOnly: true,
    callback: ({ interaction, args }) => {
        //Botaktion
        const test = args[0]
        const test2 = args[1]
        interaction.reply(`test: ${test} test2: ${test2}`)
    }
}