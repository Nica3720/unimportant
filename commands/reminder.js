const {CommandType} = require('wokcommands')

module.exports = {
    description: "Set a reminder!",
    type: CommandType.SLASH,
    options: [
        {
            name: 'time',
            description: 'the time when you want to be remembered',
            type: 3,
            required: false,
        },
        {
            name: 'after',
            description: 'when do you want to be remembered?',
            type: 3,
            required: false,
        },
        {
            name: 'channel',
            description: 'the channel in which the reminder will be send',
            type: 3,
            required: false,
        },
        {
            name: 'message',
            description: 'the content you want to be reminded of',
            type: 3,
            required: false,
        },        
        {
            name: 'date',
            description: 'the date you want to be remembered',
            type: 3,
            required: false,
        },
        {
            name: 'user',
            description: 'the person you want to remember',
            type: 3,
            required: false,
        },
        {
            name: 'interval',
            description: 'repeating the reminder command',
            type: 3,
            required: false,
        },
    ],

    callback: ({ interaction, args }) => {
        //Botaktion
        const time = args[0]
        const after = args[1]
        const channel = args[2]
        const message = args[3]
        const date = args[4]
        const user = args[5]
        const interval = args[6]

        setTimeout(() => {
            interaction.reply(`Es sind ${time} Minuten vergangen!\nDenke daran: "${message}"!`)
            }, {time}/1000/60 )
    }
}