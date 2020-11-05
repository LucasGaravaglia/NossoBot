import Discord from "discord.js";

import Command from "./command/index.js";
import event from "./events/assingReactions.js";

import Manage from "./manageFile.js";

const client = new Discord.Client();

const config = Manage.load("./config.json");
const prefix = config.prefix;
const prefixMaster = config.prefixMaster;

client.on("ready", () => {
  console.log(`Bot foi iniciado no servidor.`);
});

client.on("raw", async (data) => event(data, client));

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const command = message.content.split(" ")[0];
  if (command == `${prefixMaster}setChat`) {
    Command.setChat(message);
  }
  if (command == `${prefixMaster}help`) {
    Command.helpRoleReaction(message);
  }
  if (command == `${prefixMaster}add`) {
    Command.linkJobWithReaction(message);
  }
  if (command == `${prefixMaster}remove`) {
    Command.unlinkJob(message);
  }
  if (command == `${prefixMaster}setServer`) {
    Command.setServer(message);
  }
  if (command == `${prefixMaster}setMessage`) {
    Command.setMessage(message);
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
