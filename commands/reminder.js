const {CommandType} = require('wokcommands')
testOnly = true

function formatHours(milliseconds) {
    if (!milliseconds) return ':grey_exclamation: Ungültige Eingabe'
    let seconds = Math.floor(milliseconds / 1000) % 60
    let minutes = Math.floor(milliseconds / 60000) % 60
    let hours = Math.floor(milliseconds / 3600000) % 24
    return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} Stunden`;
  }

module.exports = {
    description: "Set a reminder!",
    type: CommandType.SLASH,
    options: [
        {
            name: 'time', //wörkt aber nur in zeitspanne von 24 tagen
            description: 'Use format hh:mm:ss',
            type: 3,
            required: false, 
        },
        {
            name: 'after', //wörkt aber nur mit ms
            description: 'when do you want to be remembered?',
            type: 3,
            required: false,
        },
        {
            name: 'channel',
            description: 'the channel in which the reminder will be send',
            type: 7,
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
            description: 'use format dd.mm.yyyy',
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
        {
            name: 'timezone',
            description: 'Wo lebst du? :eyes:',
            type: 3,
            required: false,
        }],
    testOnly: true,

    callback: ({ interaction, args }) => {
        //Botaktion
        //console.log(interaction.options.getString('after')) //bei 'get' immer type hinschreiben

        const OriginalDate = new Date();
            const OriginalYear = OriginalDate.getFullYear();
            const OriginalMonth = OriginalDate.getMonth(); // Januar ist Monat Null
            const OriginalDay = OriginalDate.getDate();
            const OriginalHour = OriginalDate.getHours() + 2;
            const OriginalMinute = OriginalDate.getMinutes();
            const OriginalSeconds = OriginalDate.getSeconds();

        const time = interaction.options.getString('time')
            //const [datePart, timePart] = time.split(' '); // Aufteilen in Datum und Uhrzeit
            //const [givenDay, givenMonth, givenYear] = datePart.split('.'); // Aufteilen des Datums in Tag, Monat und Jahr
            if (time) {
                const [givenHours, givenMinutes, givenSeconds] = time.split(':'); // Aufteilen der Uhrzeit in Stunden, Minuten und Sekunden
            
                const hourDiff = givenHours - OriginalHour
                const minuteDiff = givenMinutes - OriginalMinute
                const secondDiff = givenSeconds - OriginalSeconds

                const timeAfterMilliseconds = (hourDiff * 3600000 + minuteDiff * 60000 + secondDiff * 1000);
                console.log(timeAfterMilliseconds)}
        //const alarmDateTime = new Date();
            //alarmDateTime.setFullYear(2023);
            //alarmDateTime.setMonth(9); //Null-basiert; Sprich: Januar = Monat 0
            //alarmDateTime.setDate(18);
            //alarmDateTime.setHours(12);
            //alarmDateTime.setMinutes(11);
            //alarmDateTime.setSeconds(0);
        //const currentDateTime = new Date();
        //const timeUntilAlarm = alarmDateTime - currentDateTime;
        let afterInTime 
        const after = parseInt(interaction.options.getString('after')); // Convert time to milliseconds
            if (after) {
                const afterHours = Math.floor(after / 3600000);
                const afterMinutes = Math.floor((after % 3600000) / 60000);
                const afterSeconds = Math.floor((after % 60000) / 1000);

                const hourSum = OriginalHour + parseInt(afterHours)
                const minuteSum = OriginalMinute + parseInt(afterMinutes)
                const secondSum = OriginalSeconds + parseInt(afterSeconds)

                 afterInTime = (`${hourSum.toString()}:${minuteSum.toString().padStart(2, '0')}:${secondSum.toString().padStart(2, '0')}`);
            }
        const userChannel = interaction.options.getChannel('channel') || interaction.channel;
        const message = interaction.options.getString('message');
        const date = interaction.options.getString('date');
        const user = interaction.options.getUser('user');
        const interval = interaction.options.getString('interval');
        //const reminder = args.slice(1).join(' ');

        let reminderMessage = "## :melting_face: Erinnerung";
                if (message) {
                    reminderMessage += `\n${message}`;
                }
                if (user) {
                    reminderMessage += `\n**User:** ${user}`;
                }
                if (time) {
                    reminderMessage += `\n**Um:** ${time} Uhr`;
                }
                if (after) {
                    reminderMessage += `\n**Um:** ${afterInTime} Uhr`;
                }
                if (date) {
                    reminderMessage += `\n**Am:** ${date}`;
                //} else {
                    //reminderMessage += }
                }
                if (interval) {
                    reminderMessage += `\n**Gewähltes Intervall:** ${interval}`
                }

        if (time && after) {
            interaction.channel.send(`:grey_exclamation: Bitte verwende nur entweder 'time' __oder__ 'after'.`);
            return;
        };
        
        if (!time && !after) {
            interaction.channel.send(`:grey_exclamation: Bitte gib 'time' oder 'after' an, um einen reminder zu setzen.`);
            return;
        }

        if (time || after) {
            if (!isNaN(after) /*&& reminder*/) {
                setTimeout(() => {
                userChannel.send(reminderMessage)
                }, after);
                interaction.channel.send(`Erinnerung gesetzt in ${formatHours(after)}. :squid: `);
                return;
            } else if (after == null) {
                interaction.channel.send(`:grey_exclamation: Ungültige Eingabe?`);
                return;
            }
            if (time) {
                console.log(interaction.options.getString('time'))
                if (timeAfterMilliseconds > 0) {
                    setTimeout(() => {
                        userChannel.send(reminderMessage);
                    }, timeAfterMilliseconds);
                    interaction.channel.send(`Erinnerung gesetzt in ${formatHours(timeAfterMilliseconds)}. :squid:`);
                } else {
                    interaction.channel.send(':grey_exclamation: Bitte verwende eine Zeit, die in der Zukunft liegt.');
                return;
                }
            }
        }
                //if (currentDateTime.getTime() < alarmDateTime.getTime()) {
                    //setTimeout(() => {
                        //interaction.channel.send(`Erinnerung: ${message}`) AALO :eyes: :D - oder besser: AALOLE. Dann Mischungaus Aal lole und hallo :eyes: deinem hallo.
                    //}, timeUntilAlarm);
                //} else {
                    //interaction.channel.send(`! Bitte verwende eine Zeit, die in der Zukunft liegt.`)
                }
            }