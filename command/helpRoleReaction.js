import { MessageEmbed } from "discord.js";
export default function help(message) {
  message.channel.bulkDelete(1);
  const embed = new MessageEmbed()
    .setColor("0x0000ff")
    .setDescription(
      "[] = obrigatório\n" +
        "**==============================================**\n" +
        "**           Comandos de Administrador**\n" +
        "**==============================================**\n\n" +
        "`s!setServer [ServerId]`\n" +
        "_Observação: OBRIGATÓRIO_\n" +
        "`s!setMessage [MensagemId] `\n" +
        "_Observação: Id do server precisa estar previamente configurado_\n" +
        "`s!add [@cargo] [:emoji:]`\n" +
        "_Observação: Cargos precisam estar previamente criados_\n" +
        "`s!remove [@cargo] [:emoji:]`\n\n" +
        "**--------------------------------------------------------------------------------**\n" +
        "***_Para obter qualquer Id necessário ligar modo desenvolvedor do discord._***"
    )
    .setFooter("'Com grandes poderes vem grandes responsabilidades'");
  message.channel.send(embed);
}
