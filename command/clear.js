export default function clear(message) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    return message.reply("Você não tem permissão para usar este comando.");
  }
  message.channel.bulkDelete(100);
  message.channel.bulkDelete(100);
}
