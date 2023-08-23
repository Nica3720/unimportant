const { CommandType} = require('wokcommands')
module.exports =  {
    description: "Umrechnung von Johannisbeeren und Esspapier",
    type: CommandType.SLASH,
    options: [
        {
            name: 'j-e',
            description: 'convert amount of Johannisbeeren to amount of Esspapier',
            type: 4,
            required: false,
        },
        {
            name: 'e-j',
            description: 'convert amount of Esspapier to amount of Johannisbeeren',
            type: 4,
            required: false,
        }
    ],
    testOnly: true,

    callback: ({ interaction, args }) => {
        //Botaktion
        const JtoE = parseInt(interaction.options.getInteger('j-e'));
        const EtoJ = parseInt(interaction.options.getInteger('e-j'));

        if (!JtoE && !EtoJ) {
            interaction.reply(`__:grey_exclamation: Bitte wähle eine Umwandeloption aus.__\n\`j-e\` wandelt Johannisbeeren in Esspapier um.\n\`e-j\` wandelt Esspapier in Johannisbeeren um.`);
            return;
        }
        //if (JtoE && EtoJ) {
            //interaction.reply(`:grey_exclamation: Du kannst nur __eine__ Umwandelaktion zeitgleich ausführen.`);
            //return;
        //}
        if (JtoE) {
            const weightJ = JtoE * 1.5; // eine Johannisbeere ca. 1,5g
            const wirdE = weightJ / 0.4545; // ein Blatt Esspapier ca. 0,4545g
            interaction.reply(`Johannisbeeren: \`${JtoE}\`\n Esspapier: \`${wirdE.toFixed(1)}\``);
            return;
        }
        if (EtoJ) {
            const weightE = EtoJ * 0.4545; // ein Blatt Esspapier ca. 0,4545g
            const wirdJ = weightE / 1.5; // eine Johannisbeere im Schnitt 1,5g
            interaction.reply(`Esspapier: \`${EtoJ}\`\nJohannisbeeren: \`${wirdJ.toFixed(0)}\``);
            return;
        }
        //interaction.reply(`Johannisbeeren: ${JtoE}\n Esspapier (unbekannt)`)
    }
}