export default function muteChat(message) {
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
