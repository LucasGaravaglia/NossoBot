import com from "./command.js";
import Discord from "discord.js";
// const Discord = require("discord.js");
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
  //   const args = message.content.split(" ")[1];
  if (command === `${prefix}kick`) {
    Command.kick(message);
  }
});

client.login("NzQ4NjUxNDc0MjE2NTUwNDgz.X0giBA.oze2b778CTwJ-gJt8sElS4ENMPA");
