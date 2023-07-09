const { CommandType } = require("wokcommands");
const allowedUserID = "738480351046795305";
testOnly: true,
module.exports = {
  description: "Illegalität betonen",
  type: CommandType.BOTH,
  callback: (interaction) => {
    if (interaction.user.id === allowedUserID) {
      return {
        content: "# __**DAS IST VOLL ILLEGAL!!!! :(**__ \n (mit [auch nicht-]anwältlicher Bestätigung von nica3720 \n Das ist wahr. `[Info aus einer seriösen Quelle]`)",
      };
    } else {
      return {
        content: "nö. du darfst das nicht :D",
      };
    }
  }
};