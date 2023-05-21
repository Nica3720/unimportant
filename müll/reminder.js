/* const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Events, GatewayIntentBits} = require('discord.js');
const { token } = require('./config.json');
const client = new Client ({intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection();

const {CommandType} = require("wokcommands");

module.exports = {
    description: "Test if the Bot is online :D",
    type: CommandType.BOTH,
    callback: (interaction) => {
        return {
        content: "Yeeet - ich lebe :squid:",
        }
},
} */