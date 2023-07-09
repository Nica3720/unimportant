const { CommandType} = require('wokcommands')
// weil dann der ganze Definitionskrams wegfällt...
const allowedUserID = "738480351046795305";
// das bin ich :D
testOnly: true,
module.exports =  {
    description: "Spezifische Illegalität hervorheben",
    type: CommandType.SLASH,
    options: [
        {
            name: 'objekt',
            description: 'Illegale Sache :eyes:',
            type: 3,
            required: true,
        },
    ],
    callback: ({ interaction, args }) => {
        //Botaktion
        const objekt = interaction.options.getString('objekt')
        if (interaction.user.id === allowedUserID) {
            return {
                content: `### ${objekt} ist sehr illegal!! \n(auch dies natürlich mit ||(ggf. sogar anwältlicher)|| Bestätigung von nica3720 :))`,
            }
        } else {
            return {
                content: `Du kannst leiiiiiider keine Illegalitäts-Gesetze aufstellen :) \nHier aber ein unschuldiges Trost-Drehdelta für dich: ▼`,
        }
    }}}