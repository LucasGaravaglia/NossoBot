import { MessageEmbed } from "discord.js";

function error(message, data) {
  const embed = new MessageEmbed()
    .setTitle("ERRO ❌	")
    .setColor("0xff0000")
    .setDescription(data);
  return message.channel.send(embed);
}

function complete(message, data) {
  const embed = new MessageEmbed()
    .setTitle("Completo ✅")
    .setColor("0x00ff00")
    .setDescription(data);
  return message.channel.send(embed);
}

export default {
  error,
  complete,
};
