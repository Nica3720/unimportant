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
                if (givenSeconds === undefined) {
                    var givenSeconds = parseInt('00');
                }
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
            const schaltjahr = '2024'

            const midnightDiff = (midnightDiffS * 1000) + (midnightDiffMin * 60000) + (midnightDiffH * 3600000)
            if (givenDay === OriginalDay && givenMonth === ('0'+(OriginalMonth + 1)) && givenYear === OriginalYear) {
                var sameDayH = givenHours - OriginalHour + 2;
                var sameDayMin = givenMinutes - OriginalMinute;
                var sameDayS = givenSeconds - OriginalSeconds;
                var timeAspects = (sameDayH * 3600000) + (sameDayMin * 60000) + (sameDayS * 1000)
            } else {
                var timeAspects = parseInt(parseInt(midnightDiff) + (givenHours * 3600000) + (givenMinutes * 60000) + (givenSeconds * 1000));
            }
            console.log(dateMsDiffComplete)
            console.log(`Eingabe:\ntime: ${time} date: ${date}\n_________`)
            console.log(givenDay, OriginalDay)
            console.log(givenMonth, '0'+(OriginalMonth + 1))
            console.log(givenYear, OriginalYear)
            console.log(sameDayH, sameDayMin, sameDayS)
            console.log(`time ${timeAspects} day ${dayAspects} month ${monthAspects}`)

            const temporaryMonthEndDiff = 31 - (OriginalDay + 1);
            if (OriginalMonth === parseInt('0') || OriginalMonth === parseInt('2') || OriginalMonth === parseInt('4') || OriginalMonth === parseInt('6') || OriginalMonth === parseInt('7') ||  OriginalMonth === parseInt('9') || OriginalMonth === parseInt('11')) {
                var finalMonthEndDiff = temporaryMonthEndDiff
            } else if ( OriginalMonth === parseInt('3') || OriginalMonth === parseInt('5') || OriginalMonth === parseInt('8') || OriginalMonth === parseInt('10')) {
                var finalMonthEndDiff = temporaryMonthEndDiff - 1
            } else if ( OriginalMonth === parseInt('01') && schaltjahr) {
                var finalMonthEndDiff = temporaryMonthEndDiff - 2
            } else if ( OriginalMonth === parseInt('01') && !schaltjahr) {
                var finalMonthEndDiff = temporaryMonthEndDiff - 3
            } else {
                interaction.channel.send(`:grey_exclamation: Bitte verwende eine gültige Monatsangabe zwischen 01 und 12.\n>>> Januar = 01\nFebruar = 02\nMärz = 03\nApril = 04\nMai = 05\nJuni = 06\nJuli = 07\nAugust = 08\nSeptember = 09\nOktober = 10\nNovember = 11\nDezember = 12`);
            return;
            };
            const finalMonthEndDiffMs = finalMonthEndDiff * 86400000;
            var dayAspects = (finalMonthEndDiffMs) + (parseInt(givenDay) * 86400000);
            //console.log(dayAspects);
            const yearDiff = parseInt(givenYear) - parseInt(OriginalYear);
            if (yearDiff > 1 || yearDiff < 0) {
                interaction.channel.send(`:grey_exclamation: Bitte verwende ein Datum, das nicht mehr als 24 Tage in der Zukunft liegt.`);
            return;
            }
            const startMonth = parseInt(OriginalMonth) + 1;
            const endMonth = parseInt(givenMonth) - 1;
            const months = [
                "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"
            ]
            const skippedMonths = months.slice(startMonth, endMonth);
            const month30 = ["April", "Juni", "September", "November"];
            const month31 = ["Januar", "März", "Mai", "Juli", "August", "Oktober", "Dezember"];
            const monthFebruary = ["Februar"];
            const included31 = skippedMonths.filter(months => month31.includes(months));
            const included30 = skippedMonths.filter(months => month30.includes(months));
            const includedFebruary = skippedMonths.filter(months => monthFebruary.includes(months));
            //console.log(`Monate mit 31 Tagen: ${included31.join(', ')}`);
            //console.log(`Anzahl der Monate mit 31 Tagen: ${month31.length}`);
            //console.log(`Monate mit 30 Tagen: ${included30.join(', ')}`);
            //console.log(`Anzahl der Monate mit 30 Tagen: ${month30.length}`);
            const days31 = parseInt(included31.length) * 31
            const days30 = parseInt(included30.length) * 30
            if (givenYear === schaltjahr) {
                var daysFeb = parseInt(includedFebruary.length) * 29;
            } else {
                var daysFeb = parseInt(includedFebruary.length) * 28;
            }
            var monthAspects = (days31 + days30 + daysFeb) * 86400000;
            //console.log(monthAspects)
            //console.log(dayAspects)
            //console.log(timeAspects)
            var dateMsDiffComplete = parseInt(monthAspects) + parseInt(dayAspects) + parseInt(timeAspects)
            //console.log(dateMsDiffComplete)
            //console.log(`giv sec ${givenSeconds}`);
            //console.log(skippedMonths);

            //console.log(`temp. ${temporaryMonthEndDiff}, final: ${finalMonthEndDiff}, original: ${OriginalMonth}`)
            console.log(OriginalDate)
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

        if (date && time) {
            if (dateMsDiffComplete > 2073000000) {
                interaction.channel.send(':grey_exclamation: Bitte verwende einen Zeitraum, der weniger als 24 Tage lang ist.');
                return;
            } else if (dateMsDiffComplete > 0) {
                setTimeout(() => {
                    userChannel.send(reminderMessage);
                }, dateMsDiffComplete);
                interaction.channel.send(`Erinnerung gesetzt am ${givenDay}.${givenMonth}.${givenYear} um ${givenHours}:${givenMinutes}:${givenSeconds} Uhr. :squid:`);
                return;
            } else {
                interaction.channel.send(':grey_exclamation: Bitte verwende eine Zeit, die in der Zukunft liegt.');
                return;}}

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