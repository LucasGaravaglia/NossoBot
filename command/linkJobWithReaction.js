import Manage from "../manageFile.js";
import Embed from "./embed.js";

export default function linkJobWithReaction(message) {
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
// const channel = client.channels.cache.get("748633239790288997");
// channel
//   .fetch()
//   .then((data) =>
//     data.messages
//       .fetch("748633525636300883")
//       .then((data) =>
//         data.react(data.guild.emojis.cache.get(emoji))
//       )
//   );
