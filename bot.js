import Command from "./command.js";
import Discord from "discord.js";

import adm from "./administration.js";
import Manage from "./manageFile.js";

const config = Manage.load("./config.json");

const client = new Discord.Client();
const prefix = config.prefix;
const prefixMaster = config.prefixMaster;

client.on("ready", () => {
  console.log(`Bot foi iniciado no servidor.`);
});

client.on("raw", async (data) => adm.assignReactions(data, client));

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const command = message.content.split(" ")[0];
  if (command == `${prefixMaster}help`) {
    adm.help(message);
  }
  if (command == `${prefixMaster}add`) {
    adm.linkJobWithReaction(message);
  }
  if (command == `${prefixMaster}remove`) {
    adm.unlinkJob(message);
  }
  if (command == `${prefixMaster}setServer`) {
    adm.setServer(message);
  }
  if (command == `${prefixMaster}setMessage`) {
    adm.setMessage(message);
  }
  if (command === `${prefix}kick`) {
    Command.kick(message);
  }
  if (command == "!help") {
    Command.help(message);
  }
  if (command === `${prefix}mute`) {
    Command.muteChat(message);
  }
  if (command === `${prefix}unmute`) {
    Command.unmuteChat(message);
  }
  if (command === `${prefix}clear`) {
    Command.clear(message);
  }
  if (command === `${prefix}ban`) {
    Command.ban(message);
  }
});

client.login(config.token);
