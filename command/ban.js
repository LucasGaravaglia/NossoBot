export default function ban(message) {
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
