const { CommandType } = require("wokcommands");
const allowedUserID = "738480351046795305";
testOnly: true,
module.exports = {
  description: "Ich will mitreden!",
  type: CommandType.BOTH,
  options: [
    {
        name: 'objekt',
        description: 'ichwillwassagen',
        type: 3,
        required: true,
    },
],
callback: ({ interaction, args }) => {
            const objekt = interaction.options.getString('objekt')
            if (interaction.user.id === allowedUserID) {
                return {
                    content: `${objekt}`,
                }
            } else {
                return {
                    content: `▼`,
            }
        }
    }
}