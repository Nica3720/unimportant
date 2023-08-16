const { CommandType } = require("wokcommands");
const allowedUserID = "738480351046795305";
testOnly: true,
module.exports = {
  description: "danke",
  type: CommandType.BOTH,
  callback: (interaction) => {
    if (interaction.user.id === allowedUserID) {
      return {
        content: "Danke für Hilfe, eins lole :D\nDas ist sehr lieb :)",
      };
    } else {
      return {
        content: "nö. du darfst das nicht :D\n||naaaah, natürlich darfst du auch dankbar sein! :D\n*Wir sind nicht gut im Basketball - doch danken jeden Tag*\n-O'Bros :eyes:||",
      };
    }
  }
};