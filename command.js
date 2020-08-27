export default class command {
  kick(message) {
    const motivo = message.content.split(" ")[2];
    const user = message.mentions.users.first();
    if (user) {
      if (motivo == undefined) {
        message.reply("Não consta motivo.");
        return;
      }
      const member = message.guild.member(user);
      if (member) {
        member
          .kick(motivo)
          .then(() => {
            message.reply(`${user.tag} chutado com sucesso!`);
          })
          .catch((err) => {
            message.reply("Não consegui chutar o membro");
            console.error(err);
          });
      } else {
        message.reply("Usuário não encontrado.");
      }
    } else {
      message.reply("Você não mencionou o usuário.");
    }
  }
}
