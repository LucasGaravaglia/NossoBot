export default function kick(message) {
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
