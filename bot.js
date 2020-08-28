import com from "./command.js";
import Discord from "discord.js";
const client = new Discord.Client();
// import config from "./config.json";

const Command = new com();

client.on("ready", () => {
  console.log(`Bot foi iniciado no servidor.`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const prefix = "!"; //config.prefix;
  const command = message.content.split(" ")[0];
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
});

client.login("");
