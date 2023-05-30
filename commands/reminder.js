const {CommandType} = require('wokcommands')

function formatMinutes(milliseconds) {
    if (!milliseconds) return 'Ungültige Eingabe'
    let seconds = Math.floor(milliseconds / 1000) % 60
    let minutes = Math.floor(milliseconds / 60000)
    return `${minutes.toString()}:${seconds.toString().padStart(2, '0')} min`
  }

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
        const after = parseInt(args[1], 10) * 1000; // Convert time to milliseconds
        const channel = args[2]
        const message = args[3]
        const date = args[4]
        const user = args[5]
        const interval = args[6]
        const reminder = args.slice(1).join(' ');

        if (!isNaN(after) && reminder) {
            setTimeout(() => {
            message.channel.send(`Erinnerung: ${reminder}`)
            }, after);
            message.channel.send(`Erinnerung gesetzt in: ${after / 1000/60} Minuten.`);
        } else {
            message.channel.send(`! Ungültige Eingabe.`);
        }
    }
}