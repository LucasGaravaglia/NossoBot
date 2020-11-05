import Manage from "../manageFile.js";
import Embed from "./embed.js";
export default function setChat(message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return Embed.error(
      message,
      `${message.author} Você não tem permissão para usar este comando.`
    );
  }
  try {
    const obj = Manage.load();
    obj.chatID = message.content.split(" ")[1].toString();
    Manage.save(obj);
    Embed.complete(message, "Chat registrado.");
  } catch (e) {
    console.log(e);
    Embed.error(message, "Algo deu errado.\nConsulte o s!help");
  }
}
