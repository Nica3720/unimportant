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
            type: 10,
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
            type: 6,
            required: false,
        },
        {
            name: 'interval',
            description: 'repeating the reminder command',
            type: 3,
            required: false,
        },
    ],
    testOnly:true,

    

    callback: ({ interaction, args }) => {
        //Botaktion
        console.log(interaction.options.getString('after')) //bei 'get' immer type hinschreiben
        const time = interaction.options.getString('time')
        const after = parseInt(interaction.options.getString('after')); // Convert time to milliseconds
        const channel = interaction.options.getString('channel')
        const message = interaction.options.getString('message')
        const date = interaction.options.getString('date')
        const user = interaction.options.getUser('user')
        const interval = interaction.options.getString('interval')
        //const reminder = args.slice(1).join(' ');

        if (!isNaN(after) /*&& reminder*/) {
            setTimeout(() => {
            interaction.channel.send(`Erinnerung: ${after}`)
            }, after);
            interaction.channel.send(`Erinnerung gesetzt in: ${formatMinutes(after)} Minuten.`);
        } else {
            interaction.channel.send(`! Ungültige Eingabe.`);
        }
    }
}