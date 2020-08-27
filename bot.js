const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log(`Bot foi iniciado no servidor.`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;
  const args = msg.content.trim().split(" ");
  const command = args.shift();
  if (command === `${config.prefix}ping`) {
    msg.channel.send("Pong!");
  }
});

client.login(config.token);
