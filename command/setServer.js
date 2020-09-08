import Manage from "../manageFile.js";
import Embed from "./embed.js";
export default function setServer(message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return Embed.error(
      message,
      `${message.author} Você não tem permissão para usar este comando.`
    );
  }
  try {
    const obj = {
      serverID: message.content.split(" ")[1].toString(),
      messages: [],
    };
    Manage.save(obj);
    Embed.complete(message, "Server registrado.");
  } catch (e) {
    console.log(e);
    Embed.error(message, "Algo deu errado.\nConsulte o s!help");
  }
}
