import { MessageEmbed } from "discord.js";
function kick(message) {
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.reply("Você não tem permissão para usar este comando.");
  }
  const motivo = message.content.split(" ")[2];
  const user = message.mentions.users.first();
  var response = "";
  if (user) {
    if (motivo == undefined) {
      response = "Você foi chutado do servidor.";
    } else {
      response = motivo;
    }
    const member = message.guild.member(user);
    if (member) {
      member
        .kick(response)
        .then(() => {
          message.author.send(`${user.tag} chutado com sucesso!`);
        })
        .catch((err) => {
          message.author.send("Não consegui chutar o membro");
          console.error(err);
        });
    } else {
      message.author.send("Usuário não encontrado.");
    }
  } else {
    message.author.send("Você não mencionou o usuário.");
  }
  message.channel.bulkDelete(1);
}

function muteChat(message) {
  if (!message.member.hasPermission("MUTE_MEMBERS")) {
    return message.reply("Você não tem permissão para usar este comando.");
  }
  let user = message.mentions.members.first();
  if (user) {
    const member = message.guild.member(user);
    if (member) {
      let roleMute = message.guild.roles.cache.get("748962981429379202");
      if (!roleMute) {
        message.author.send(
          "Erro ao silenciar usuário, favor consultar o desenvolvedor ou algum Adm"
        );
      }
      member.roles.add(roleMute);
    } else {
      message.author.send("Usuário não encontrado.");
    }
  } else {
    message.author.send("Você não mencionou o usuário.");
  }
  message.channel.bulkDelete(1);
}

function unmuteChat(message) {
  if (!message.member.hasPermission("MUTE_MEMBERS")) {
    return message.reply("Você não tem permissão para usar este comando.");
  }
  let user = message.mentions.members.first();
  if (user) {
    const member = message.guild.member(user);
    if (member) {
      let roleMute = message.guild.roles.cache.get("748962981429379202");
      if (!roleMute) {
        message.author.send(
          "Erro ao devolver o dom da escrita, favor consultar o desenvolvedor ou algum Adm"
        );
      }
      member.roles.remove(roleMute);
    } else {
      message.author.send("Usuário não encontrado.");
    }
  } else {
    message.author.send("Você não mencionou o usuário.");
  }
  message.channel.bulkDelete(1);
}

function clear(message) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.reply("Você não tem permissão para usar este comando.");
  }
  message.channel.bulkDelete(100);
  message.channel.bulkDelete(100);
}

function ban(message) {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.reply("Você não tem permissão para usar este comando.");
  }
  var tempoBanido = 0;
  tempoBanido = parseInt(message.content.split(" ")[2], 10);
  const motivo = message.content.split(" ")[3];
  const user = message.mentions.users.first();
  var response = "";
  if (user) {
    if (motivo == undefined) {
      response = "Você foi banido, repense suas atitudes.";
    } else {
      response = motivo;
    }
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban({
            days: tempoBanido,
            reason: response,
          })
          .then(() => {
            message.reply(`Usuário ${user.tag} banido com sucesso`);
          })
          .catch((err) => {
            message.reply("Não consegui banir o membro.");
            console.error(err);
          });
      } else {
        message.reply("Este usuário não esta nesse grupo.");
      }
    } else {
      message.reply("Você não mencionou o usuário para ser banido");
    }
  }
  message.channel.bulkDelete(1);
}

function help(message) {
  const embed = new MessageEmbed()
    .setColor("0x0000ff")
    .setDescription(
      "[] = obrigatório\n" +
        "()=opcional\n" +
        "**==================================**\n" +
        "**Comandos de Administrador**\n" +
        "**==================================**\n\n" +
        "`!kick [@user] (motivo)`\n\n" +
        "`!mute [@user]`\n\n" +
        "`!unmute [@user]`\n\n" +
        "`!ban [@user] (tempo do ban) (motivo do ban)`\n\n" +
        "`!clear`\n" +
        "**---------------------------------------------**"
    );
  message.channel.bulkDelete(1);
  message.channel.send(embed);
}

export default {
  kick,
  muteChat,
  unmuteChat,
  clear,
  ban,
  help,
};

// const user = message.mentions.users.first();
// const member = message.guild.member(user);
// member.voice.mute.valueOf(false);
// }
