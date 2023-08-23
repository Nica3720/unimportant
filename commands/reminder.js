const {CommandType} = require('wokcommands')
testOnly = true

function formatHours(milliseconds) {
    if (!milliseconds) return ':grey_exclamation: Ungültige Eingabe'
    let seconds = Math.floor(milliseconds / 1000) % 60
    let minutes = Math.floor(milliseconds / 60000) % 60
    let hours = Math.floor(milliseconds / 3600000) % 24
    return `${hours.toString()}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

module.exports = {
    description: "Set a reminder!",
    type: CommandType.SLASH,
    options: [
        {
            name: 'time', //wörkt aber nur in zeitspanne von 24 tagen, ig, das passt...
            description: 'use format hh:mm:ss',
            type: 3,
            required: false, 
        },
        {
            name: 'after', // geht wieder 
            description: 'number and time specification (d; h; m; s)',
            type: 3,
            required: false,
        },
        {
            name: 'channel', //wörkt
            description: 'the channel in which the reminder will be send',
            type: 7,
            required: false,
        },
        {
            name: 'message', //sowieso
            description: 'reason for your reminder',
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
            name: 'user', //wörkt
            description: 'use @user or @role',
            type: 9,
            required: false,
        },
        {
            name: 'interval',
            description: 'repeat',
            type: 3,
            required: false,
        },
        {
            name: 'timezone', //will nich updaten -.-
            description: 'use international shortcuts (UTC)',
            type: 3,
            required: false,
            choices: [
                {
                    name: 'BIT (-12h)',
                    //description: '(Region Baker Island)',
                    value: '-12'
                },
                {
                    name: 'NUT (-11h)',
                    //description: '(Region Alofi, Niue)',
                    value: '-11'
                },
                {
                    name: 'HST (-10h)',
                    //description: '(Region Honolulu, Hawaii)',
                    value: '-10'
                },
                {
                    name: 'AKST (-9h)',
                    //description: '(Region Anchorage, Alaska)',
                    value: '-09'
                },
                {
                    name: 'PST (-8h)',
                    //description: '(Region Los Angeles, Kalifornien)',
                    value: '-08'
                },
                {
                    name: 'MST (-7h)',
                    //description: '(Region Denver, Colorado)',
                    value: '-07'
                },
                {
                    name: 'CST (-6h)',
                    //description: '(Region Chicago, Illinois)',
                    value: '-06'
                },
                {
                    name: 'EST (-5h)',
                    //description: '(Region New York City, New York)',
                    value: '-05'
                },
                {
                    name: 'AST (-4h)',
                    //description: '(Region San Juan, Puerto Rico)',
                    value: '-04'
                },
                {
                    name: 'AMT (-3h)',
                    //description: '(Region Manaus, Brasilien)',
                    value: '-03'
                },
                {
                    name: 'BRT (-2h)',
                    //description: '(Region São Paulo, Brasilien)',
                    value: '-02'
                },
                {
                    name: 'AZOT (-1h)',
                    //description: '(Region Azoren, Portugal)',
                    value: '-01'
                },
                {
                    name: 'GMT',
                    //description: '(Region London, GB)',
                    value: '0'
                },
                {
                    name: 'CET (+1h)',
                    //description: '(Region Berlin, Deutschland)',
                    value: '1'
                },
                {
                    name: 'EET (+2h)',
                    //description: '(Region Athen, Griechenland)',
                    value: '2'
                },
                {
                    name: 'MSK (+3h)',
                    //description: '(Region Moskau, Russland)',
                    value: '3'
                },
                {
                    name: 'GST (+4h)',
                    //description: '(Region Dubai, VAE)',
                    value: '4'
                },
                {
                    name: 'PKT (+5h)',
                    //description: '(Region Islamabad, Pakistan)',
                    value: '5'
                },
                {
                    name: 'BST (+6h)',
                    //description: '(Region Dhaka, Bangladesch)',
                    value: '6'
                },
                {
                    name: 'ICT (+7h)',
                    //description: '(Region Bangkok, Thailand)',
                    value: '7'
                },
                {
                    name: 'CST (+8h)',
                    //description: '(Region Peking, China)',
                    value: '8'
                },
                {
                    name: 'JST (+9h)',
                    //description: '(Region Tokio, Japan)',
                    value: '9'
                },
                {
                    name: 'AEST (+10h)',
                    //description: '(Region Sydney, Australien)',
                    value: '10'
                },
                {
                    name: 'SBT (+11h)',
                    //description: '(Region Honiara, Salomonen)',
                    value: '11'
                },
                {
                    name: 'NZST (+12h)',
                    //description: '(Region Wellington, Neuseeland)',
                    value: '12'
                },
            ]
        }],
    testOnly: true,

    callback: ({ interaction, args }) => {
        //Botaktion
        //console.log(interaction.options.getString('after')) //bei 'get' immer type hinschreiben
        const timezone = interaction.options.getString('timezone');
        const OriginalDate = new Date();
            const OriginalYear = OriginalDate.getFullYear();
            const OriginalMonth = OriginalDate.getMonth(); // Januar ist Monat Null
            const OriginalDay = OriginalDate.getDate();
            const OriginalHour = OriginalDate.getHours() + 2;
            //const OriginalHour = OriginalDate.getHours() + parseInt(choices) || OriginalDate.getHours() + 2
            const OriginalMinute = OriginalDate.getMinutes();
            const OriginalSeconds = OriginalDate.getSeconds();

        const time = interaction.options.getString('time')
            //const [datePart, timePart] = time.split(' '); // Aufteilen in Datum und Uhrzeit
            //const [givenDay, givenMonth, givenYear] = datePart.split('.'); // Aufteilen des Datums in Tag, Monat und Jahr
            let timeAfterMilliseconds
            //let givenHours
            //let givenMinutes
            let hourDiff
            if (time) {
                var [givenHours, givenMinutes, givenSeconds] = time.split(':'); // Aufteilen der Uhrzeit in Stunden, Minuten und Sekunden

                const hourDiff = givenHours - OriginalHour
                const minuteDiff = givenMinutes - OriginalMinute
                const secondDiff = givenSeconds - OriginalSeconds

                timeAfterMilliseconds = (hourDiff * 3600000 + minuteDiff * 60000 + secondDiff * 1000);
                //console.log(timeAfterMilliseconds)
            }
            //console.log(time.split(':'))
            //console.log(givenMinutes)
        let afterInTime 
        const after = parseInt(interaction.options.getString('after')); // Convert time to milliseconds
        //console.log(after)
        const afterString = interaction.options.getString('after');
            if (after) {
                const afterHours = Math.floor(after / 3600000);
                const afterMinutes = Math.floor((after % 3600000) / 60000);
                const afterSeconds = Math.floor((after % 60000) / 1000);

                const hourSum = OriginalHour + parseInt(afterHours)
                const minuteSum = OriginalMinute + parseInt(afterMinutes)
                const secondSum = OriginalSeconds + parseInt(afterSeconds)

                 afterInTime = (`${hourSum.toString()}:${minuteSum.toString().padStart(2, '0')}:${secondSum.toString().padStart(2, '0')}`);
                 var [afterNumber, afterUnit] = afterString.split(' ');
            }
            
        const userChannel = interaction.options.getChannel('channel') || interaction.channel;
        const message = interaction.options.getString('message');
        const date = interaction.options.getString('date');
            if (date) {
                var [givenDay, givenMonth, givenYear] = date.split('.')
                //if (time) {
                    //const givenDateFormat = `${givenYear}-${givenMonth}-${givenDay}T${givenHours-2}:${givenMinutes}:${givenSeconds}.000Z`
                    //var dateTimeDiffInMs = Math.abs(givenDateFormat - OriginalDate);
                    //console.log(OriginalDate.get())
                    //console.log(OriginalDate)
                    //console.log(givenDateFormat)
                    //console.log(dateTimeDiffInMs)}
            }
        const user = interaction.options.getMentionable('user');
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

        if (date) {
            const dateDiffY = givenYear - OriginalYear;
            const dateDiffM = givenMonth - OriginalMonth;
            const dateDiffD = givenDay - OriginalDay;
            const midnightDiffH = 23 - OriginalHour;
            const midnightDiffMin = 59 - OriginalMinute;
            const midnightDiffS = 60 - OriginalSeconds;

            const midnightDiff = (midnightDiffS * 1000) + (midnightDiffMin * 60000) + (midnightDiffH * 3600000)
            const timeAspects = midnightDiff + (givenHours * 3600000) + (givenMinutes * 60000) + (givenSeconds * 1000)
            const temporaryMonthEndDiff = 31 - OriginalDay;
            if (OriginalMonth === '1' || OriginalMonth === '3' || OriginalMonth === '5' || OriginalMonth === '7' || OriginalMonth === '8' || )

            console.log(OriginalDate)
            console.log(OriginalMonth)
            //console.log(timeAspects)
            //console.log(midnightDiffH, midnightDiffMin, midnightDiffS)
        }

        if (time && after) {
            interaction.channel.send(`:grey_exclamation: Bitte verwende nur entweder \`time\` __oder__ \`after\`.`);
            return;
        };

        if (after && date) {
            interaction.channel.send(`:grey_exclamation: Bitte verwende nur entweder \`date\` __oder__ \`after\`. Beides zusammen ist nicht möglich. Wenn du \`date\` nutzen willst, tue dies in Kombination mit \`time\`.`);
            return;
        };
        
        if (!time && !after) {
            interaction.channel.send(`:grey_exclamation: Bitte gib \`time\` oder \`after\` an, um einen reminder zu setzen.`);
            return;
        }

        if (after) {
                if (afterUnit === 's' || afterUnit === 'seconds' || afterUnit === 'Sekunden' || afterUnit === 'Sek' || afterUnit === 'sek') {
                    const afterInMs = afterNumber * 1000;
                    setTimeout(() => {
                        userChannel.send(reminderMessage)
                    }, (afterNumber * 1000));
                    interaction.channel.send(`Erinnerung gesetzt in ${formatHours(afterInMs)}. :squid: `);
                    return;
                };
                if (afterUnit === 'Millisekunden' || afterUnit === 'milliseconds' || afterUnit === 'Ms' || afterUnit === 'ms') {
                    setTimeout(() => {
                        userChannel.send(reminderMessage)
                    }, afterNumber);
                    interaction.channel.send(`Erinnerung gesetzt in ${formatHours(afterNumber)}. :squid: `);
                    return;
                };
                if (afterUnit === 'min' || afterUnit === 'minutes' || afterUnit === 'Minuten' || afterUnit === 'Min') {
                    const afterInMs = afterNumber * 60000;
                    setTimeout(() => {
                        userChannel.send(reminderMessage)
                    }, (afterNumber * 60000));
                    interaction.channel.send(`Erinnerung gesetzt in ${formatHours(afterInMs)}. :squid: `);
                    return;
                };
                if (afterUnit === 'h' || afterUnit === 'hours' || afterUnit === 'Stunden') {
                    const afterInMs = afterNumber * 3600000;
                    setTimeout(() => {
                        userChannel.send(reminderMessage)
                    }, (afterNumber * 3600000));
                    interaction.channel.send(`Erinnerung gesetzt in ${formatHours(afterInMs)}. :squid: `);
                    return;
                };
                if (afterUnit === 'd' || afterUnit === 'days' || afterUnit === 'Tage') {
                    const afterInMs = afterNumber * 3600000 * 24;
                    setTimeout(() => {
                        userChannel.send(reminderMessage)
                    }, (afterNumber * 3600000 * 24));
                    interaction.channel.send(`Erinnerung gesetzt in ${formatHours(afterInMs)}. :squid: `);
                    return;
                }
            }
        if (time) {
            if (timeAfterMilliseconds > 0) {
                setTimeout(() => {
                    userChannel.send(reminderMessage);
                }, timeAfterMilliseconds);
                interaction.channel.send(`Erinnerung gesetzt in ${formatHours(timeAfterMilliseconds)}. :squid:`);
                return;
            } else {
                interaction.channel.send(':grey_exclamation: Bitte verwende eine Zeit, die in der Zukunft liegt.');
                return;
            }
        }
    }
}