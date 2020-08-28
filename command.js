export default class command {
  kick(message) {
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
  muteChat(message) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) {
      return message.reply("Você não tem permissão para usar este comando.");
    }
    let member = message.mentions.members.first();
    let roleMute = message.guild.roles.cache.find((r) => r.name === "mute");
    if (!mute) {
      message.author.send(
        "Cargo inexistente, favor consultar o desenvolvedor ou algum Adm"
      );
    }
    member.roles.add(roleMute);
  }
  unmuteChat(message) {
    if (!message.member.hasPermission("MUTE_MEMBERS")) {
      return message.reply("Você não tem permissão para usar este comando.");
    }
    let member = message.mentions.members.first();
    let roleMute = message.guild.roles.cache.find((r) => r.name === "mute");
    if (!mute) {
      message.author.send(
        "Cargo inexistente, favor consultar o desenvolvedor ou algum Adm"
      );
    }
    member.roles.remove(roleMute);
  }
  clear(message) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return message.reply("Você não tem permissão para usar este comando.");
    }
    message.channel.bulkDelete(100);
    message.channel.bulkDelete(100);
  }
  ban(message) {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return message.reply("Você não tem permissão para usar este comando.");
    }
    const motivo = message.content.split(" ")[2];
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
              days: 0,
              reason: "They were bad!",
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
  }
  // const user = message.mentions.users.first();
  // const member = message.guild.member(user);
  // member.voice.mute.valueOf(false);
}
