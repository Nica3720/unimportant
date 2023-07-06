const {CommandType} = require("wokcommands");

module.exports = {
    description: "Illegalität betonen",
    type: CommandType.BOTH,
    callback: (interaction) => {
        return {
        content: "# __**DAS IST VOLL ILLEGAL!!!! :(**__ \n (mit anwältlicher Bestätigung von nica3720)",
        }
},
}