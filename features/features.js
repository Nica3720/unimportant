const { ActivityType } = require("discord.js")
// :D
module.exports = (instance, client) => {
    client.user.setActivity("Nica", { type: ActivityType.Listening })
}