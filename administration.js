import Manage from "./manageFile.js";
import { MessageEmbed } from "discord.js";

function linkJobWithReaction(message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const embed = new MessageEmbed()
      .setTitle("ERRO ❌	")
      .setColor("0xff0000")
      .setDescription(
        `${message.author} Você não tem permissão para usar este comando.`
      );
    return message.channel.send(embed);
  }
  try {
    var ListOfOffice = Manage.load();
    var reactionTempId = message.content.split(":");
    var newList = {
      cargoID: message.content.split(" ")[1].toString(),
      reactionID: reactionTempId[Object.keys(reactionTempId).length - 1]
        .toString()
        .slice(0, -1),
    };
    ListOfOffice.push(newList);
    Manage.save(ListOfOffice);
    const embed = new MessageEmbed()
      .setTitle("Completo ✅")
      .setColor("0x00ff00")
      .setDescription(
        `${message.content.split(" ")[1]} vinculado ao emoji :${
          reactionTempId[Object.keys(reactionTempId).length - 2]
        }:`
      );
    message.channel.send(embed);
  } catch {
    const embed = new MessageEmbed()
      .setTitle("ERRO ❌	")
      .setColor("0xff0000")
      .setDescription("Algo deu errado.\nConsulte o s!help");
    message.channel.send(embed);
  }
}

function unlinkJob(message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const embed = new MessageEmbed()
      .setTitle("ERRO ❌	")
      .setColor("0xff0000")
      .setDescription(
        `${message.author} Você não tem permissão para usar este comando.`
      );
    return message.channel.send(embed);
  }
  try {
    var ListOfOffice = Manage.load();
    var reactionTempId = message.content.split(":");
    var newList = {
      cargoID: message.content.split(" ")[1].toString(),
      reactionID: reactionTempId[Object.keys(reactionTempId).length - 1]
        .toString()
        .slice(0, -1),
    };
    ListOfOffice.pop(newList);
    Manage.save(ListOfOffice);
    const embed = new MessageEmbed()
      .setTitle("Completo ✅")
      .setColor("0x00ff00")
      .setDescription(
        `${message.content.split(" ")[1]} desvinculado ao emoji :${
          reactionTempId[Object.keys(reactionTempId).length - 2]
        }:`
      );
    message.channel.send(embed);
  } catch {
    const embed = new MessageEmbed()
      .setTitle("ERRO ❌	")
      .setColor("0xff0000")
      .setDescription("Algo deu errado.\nConsulte o s!help");
    message.channel.send(embed);
  }
}

function setConfig(message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const embed = new MessageEmbed()
      .setTitle("ERRO ❌	")
      .setColor("0xff0000")
      .setDescription(
        `${message.author} Você não tem permissão para usar este comando.`
      );
    return message.channel.send(embed);
  }
  try {
    const obj = {
      chatID: message.content.split(" ")[1].toString(),
      serverID: message.content.split(" ")[2].toString(),
    };
    Manage.save(obj, "./configServer.json");
    const embed = new MessageEmbed()
      .setTitle("Completo ✅")
      .setColor("0x00ff00")
      .setDescription("Mensagem e canal registrados.");
    message.channel.send(embed);
  } catch {
    const embed = new MessageEmbed()
      .setTitle("ERRO ❌	")
      .setColor("0xff0000")
      .setDescription("Algo deu errado.\nConsulte o s!help");
    message.channel.send(embed);
  }
}

function help(message) {
  const embed = new MessageEmbed()
    .setColor("0x0000ff")
    .setDescription(
      "[] = obrigatório\n" +
        "**==================================**\n" +
        "**Comandos de Administrador**\n" +
        "**==================================**\n\n" +
        "`s!set [MensagemId] [ServerId]`\n" +
        "_Observação: O bot so suporta uma mensagem para receber reações._ \n\n" +
        "`s!add [@cargo] [:emoji:]`\n" +
        "_Observação: Cargos precisam estar previamente criados\n" +
        "`s!remove [@cargo] [:emoji:]`\n\n" +
        "**----------------------------------------**"
    )
    .setFooter("'Com grandes poderes vem grandes responsabilidades'");
  message.channel.bulkDelete(1);
  message.channel.send(embed);
}

async function assignReactions(data, client) {
  if (data.t !== "MESSAGE_REACTION_ADD" && data.t !== "MESSAGE_REACTION_REMOVE")
    return;
  const config = Manage.load("./configServer.json");
  if (data.d.message_id != config.chatID) return;

  const param = Manage.load();
  const Guild = client.guilds.fetch(config.serverID);
  const member = (await Guild).member(data.d.user_id);

  let cargo;

  if (data.t === "MESSAGE_REACTION_ADD") {
    for (let i = 0; i < Object.keys(param).length; i++) {
      if (data.d.emoji.id == parseInt(param[i].reactionID)) {
        cargo = (await Guild).roles.fetch(param[i].cargoID.slice(3, -1));
        cargo.then((data) => {
          member.roles.add(data);
        });
      }
    }
  }

  if (data.t === "MESSAGE_REACTION_REMOVE") {
    for (let i = 0; i < Object.keys(param).length; i++) {
      if (data.d.emoji.id == parseInt(param[i].reactionID)) {
        cargo = (await Guild).roles.fetch(param[i].cargoID.slice(3, -1));
        cargo.then((data) => {
          member.roles.remove(data);
        });
      }
    }
  }
}

export default {
  linkJobWithReaction,
  assignReactions,
  setConfig,
  unlinkJob,
  help,
};
