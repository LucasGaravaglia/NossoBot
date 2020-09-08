import { MessageEmbed } from "discord.js";
export default function help(message) {
  const embed = new MessageEmbed()
    .setColor("0x0000ff")
    .setDescription(
      "[] = obrigatório\n" +
        "()=opcional\n" +
        "**==============================================**\n" +
        "**           Comandos de Administrador**\n" +
        "**==============================================**\n\n" +
        "`!kick [@user] (motivo)`\n\n" +
        "`!mute [@user]`\n\n" +
        "`!unmute [@user]`\n\n" +
        "`!ban [@user] (tempo do ban) (motivo do ban)`\n\n" +
        "`!clear`\n" +
        "**--------------------------------------------------------------------------------**"
    );
  message.channel.bulkDelete(1);
  message.channel.send(embed);
}
