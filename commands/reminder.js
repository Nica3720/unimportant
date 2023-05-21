const {CommandType} = require('wokcommands')

module.exports = {
    description: "Set a reminder!",
    type: CommandType.SLASH,
    options: [
        {
            name: 'time',
            description: 'the time when you want to be remembered',
            type: 3,
            required: true,
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
        const channel = args[1]
        const message = args[2]
        const date = args[3]
        const user = args[4]
        const interval = args[5]
        interaction.reply(`**time:** ${time} \n**channel:** ${channel} \n**message:** ${message} \n**date:** ${date} \n**user:** ${user} \n**interval:** ${interval}`)
    }
}