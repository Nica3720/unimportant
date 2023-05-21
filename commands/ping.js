const {CommandType} = require("wokcommands");

module.exports = {
    description: "Test if the Bot is online :D",
    type: CommandType.BOTH,
    callback: (interaction) => {
        return {
        content: "Yeeet - ich lebe :squid:",
        }
},
}