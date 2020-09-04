import Manage from "./manageFile.js";
import { MessageEmbed } from "discord.js";
import Embed from "./embed.js";

function linkJobWithReaction(message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return Embed.error(
      message,
      `${message.author} Você não tem permissão para usar este comando.`
    );
  }
  try {
    var dataFile = Manage.load();
    if (!dataFile.serverID) {
      return Embed.error(
        message,
        `${message.author} Atenção! Adicionar uma mensagem para receber reações primeiro.`
      );
    } else if (!dataFile.messages.length) {
      return Embed.error(
        message,
        `${message.author} Atenção! Adicionar um servidor primeiro.`
      );
    }
    var reactionTempId = message.content.split(":");
    var content = {
      cargoID: message.content.split(" ")[1].toString(),
      reactionID: reactionTempId[Object.keys(reactionTempId).length - 1]
        .toString()
        .slice(0, -1),
    };
    dataFile.messages[0].content.push(content);
    Manage.save(dataFile);
    Embed.complete(
      message,
      `${message.content.split(" ")[1]} vinculado ao emoji :${
        reactionTempId[Object.keys(reactionTempId).length - 2]
      }:`
    );
  } catch (e) {
    console.log(e);
    Embed.error(message, "Algo deu errado.\nConsulte o s!help");
  }
}

function unlinkJob(message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return Embed.error(
      message,
      `${message.author} Você não tem permissão para usar este comando.`
    );
  }
  try {
    var ListOfOffice = Manage.load();
    var reactionTempId = message.content.split(":");
    var ListRemove = {
      cargoID: message.content.split(" ")[1].toString(),
      reactionID: reactionTempId[Object.keys(reactionTempId).length - 1]
        .toString()
        .slice(0, -1),
    };
    var contentJson = ListOfOffice.messages[0].content.find(
      (content) => content.cargoID == ListRemove.cargoID
    );
    if (typeof contentJson !== "undefined") {
      var indexArray = ListOfOffice.messages[0].content.findIndex(
        (content) => content.cargoID == ListRemove.cargoID
      );

      if (indexArray == 0) {
        ListOfOffice.messages[0].content = ListOfOffice.messages[0].content.slice(
          1
        );
      } else {
        var arr1 = ListOfOffice.messages[0].content.slice(0, indexArray);
        if (indexArray == ListOfOffice.messages[0].content.length - 1) {
          ListOfOffice.messages[0].content = arr1;
        } else {
          var arr2 = ListOfOffice.messages[0].content.slice(
            indexArray + 1,
            ListOfOffice.messages.length
          );

          ListOfOffice.messages[0].content = arr1.concat(arr2);
        }
      }
    } else {
      Embed.error(
        "emoji não consta na lista.\nConsultar o s!help ou o programador."
      );
      return;
    }
    Manage.save(ListOfOffice);
    Embed.complete(
      message,
      `${message.content.split(" ")[1]} desvinculado ao emoji :${
        reactionTempId[Object.keys(reactionTempId).length - 2]
      }:`
    );
  } catch (e) {
    console.log(e);
    Embed.error(message, "Algo deu errado.\nConsulte o s!help");
  }
}

function setServer(message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return Embed.error(
      message,
      `${message.author} Você não tem permissão para usar este comando.`
    );
  }
  try {
    const obj = {
      serverID: message.content.split(" ")[1].toString(),
      messages: [],
    };
    Manage.save(obj);
    Embed.complete(message, "Server registrado.");
  } catch (e) {
    console.log(e);
    Embed.error(message, "Algo deu errado.\nConsulte o s!help");
  }
}

function setMessage(message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return Embed.error(
      message,
      `${message.author} Você não tem permissão para usar este comando.`
    );
  }
  try {
    var dataFile = Manage.load();
    if (!dataFile.serverID) {
      return Embed.error(
        message,
        `${message.author} Atenção! Adicionar um servidor primeiro.`
      );
    }
    var obj = {
      id: message.content.split(" ")[1].toString(),
      content: [],
    };
    var contentJson = dataFile.messages.find((message) => message.id == obj.id);
    if (typeof contentJson !== "undefined") {
      obj = contentJson;
      var indexArray = dataFile.messages.findIndex(
        (message) => message.id == obj.id
      );
      var arr1 = dataFile.messages.slice(0, indexArray);
      if (indexArray == dataFile.messages.length - 1) {
        arr1.unshift(obj);
        dataFile.messages = arr1;
      } else {
        var arr2 = dataFile.messages.slice(
          indexArray + 1,
          dataFile.messages.length
        );
        var newObj = arr1.concat(arr2);
        newObj.unshift(obj);
        dataFile.messages = newObj;
      }
    } else {
      dataFile.messages.unshift(obj);
    }
    Manage.save(dataFile);
    Embed.complete(message, "Mensagem registrada.");
  } catch (e) {
    console.log(e);
    Embed.error(message, "Algo deu errado.\nConsulte o s!help");
  }
}

function help(message) {
  message.channel.bulkDelete(1);
  const embed = new MessageEmbed()
    .setColor("0x0000ff")
    .setDescription(
      "[] = obrigatório\n" +
        "**==============================================**\n" +
        "**           Comandos de Administrador**\n" +
        "**==============================================**\n\n" +
        "`s!setServer [ServerId]`\n" +
        "`s!setMessage [MensagemId] `\n" +
        "_Observação: Id do server precisa estar previamente configurado_\n" +
        "`s!add [@cargo] [:emoji:]`\n" +
        "_Observação: Cargos precisam estar previamente criados_\n" +
        "`s!remove [@cargo] [:emoji:]`\n\n" +
        "**--------------------------------------------------------------------------------**"
    )
    .setFooter("'Com grandes poderes vem grandes responsabilidades'");
  message.channel.send(embed);
}

async function assignReactions(data, client) {
  if (data.t !== "MESSAGE_REACTION_ADD" && data.t !== "MESSAGE_REACTION_REMOVE")
    return;
  const configJson = Manage.load();
  let flag = true;
  var param;
  configJson.messages.forEach((element) => {
    if (element.id == data.d.message_id) {
      flag = false;
      param = element.content;
    }
  });
  if (flag) return;

  const Guild = client.guilds.fetch(configJson.serverID);
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
  unlinkJob,
  setServer,
  setMessage,
  help,
  assignReactions,
};
