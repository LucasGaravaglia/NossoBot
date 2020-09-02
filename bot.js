import Command from "./command.js";
import Discord from "discord.js";

import adm from "./administration.js";

const client = new Discord.Client();
const prefix = "!"; //config.prefix;

client.on("ready", () => {
  console.log(`Bot foi iniciado no servidor.`);
});

client.on("raw", async (data) => adm.assignReactions(data, client));

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const command = message.content.split(" ")[0];
  if (command == "adm!linkJobWithReaction") {
    adm.linkJobWithReaction(message);
  }
  if (command == "adm!setConfig") {
    adm.setConfig(message);
  }
  if (command === `${prefix}kick`) {
    Command.kick(message);
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

client.login("NzQ4NjUxNDc0MjE2NTUwNDgz.X0giBA.FGDmQ1VZHrn9aq5A2TiGrpE80Hg");
