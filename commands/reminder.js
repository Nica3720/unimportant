const {CommandType} = require('wokcommands')
testOnly = true

function formatMinutes(milliseconds) {
    if (!milliseconds) return ':grey_exclamation: Ungültige Eingabe'
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
        },],
    testOnly: true,
    callback: ({ interaction, args }) => {
        //Botaktion
        //console.log(interaction.options.getString('after')) //bei 'get' immer type hinschreiben
        const time = interaction.options.getString('time')
        const [hours, minutes, seconds] = time.split(':'); // 'hh:mm:ss' aufteilen
        const timeAfterMilliseconds = (parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds)) * 1000; // In Millisekunden umrechnen
        //const alarmDateTime = new Date();
            //alarmDateTime.setFullYear(2023);
            //alarmDateTime.setMonth(9); //Null-basiert; Sprich: Januar = Monat 0
            //alarmDateTime.setDate(18);
            //alarmDateTime.setHours(12);
            //alarmDateTime.setMinutes(11);
            //alarmDateTime.setSeconds(0);
        //const currentDateTime = new Date();
        //const timeUntilAlarm = alarmDateTime - currentDateTime;
        const after = parseInt(interaction.options.getString('after')); // Convert time to milliseconds
        const channel = interaction.options.getString('channel');
        const message = interaction.options.getString('message');
        const date = interaction.options.getString('date');
        const user = interaction.options.getUser('user');
        const interval = interaction.options.getString('interval');
        //const reminder = args.slice(1).join(' ');

        if (time || after) {
            if (!isNaN(after) /*&& reminder*/) {
                setTimeout(() => {
                interaction.channel.send(`Erinnerung: ${message}`)
                }, after);
                interaction.channel.send(`Erinnerung gesetzt in: ${formatMinutes(after)}.`);
            } else if (after !== null) {
                interaction.channel.send(`:grey_exclamation: Ungültige Eingabe?`);
            }
            if (time) {
                console.log(interaction.options.getString('time'))
                if (timeAfterMilliseconds > 0) {
                    console.log(interaction.options.getString('time'))
                    setTimeout(() => {
                        interaction.channel.send(`Erinnerung: ${message}`);
                    }, timeAfterMilliseconds);
            }} else if (time !== null) {
                (':grey_exclamation: Bitte verwende eine Zeit, die in der Zukunft liegt.')
            }
                //if (currentDateTime.getTime() < alarmDateTime.getTime()) {
                    //setTimeout(() => {
                        //interaction.channel.send(`Erinnerung: ${message}`)
                    //}, timeUntilAlarm);
                //} else {
                    //interaction.channel.send(`! Bitte verwende eine Zeit, die in der Zukunft liegt.`)
        } else {
            return {
                content: "Bitte gib 'after' oder 'time' an, um einen reminder zu setzen."}
            }}}