import Manage from "../manageFile.js";
import Embed from "./embed.js";
export default function setMessage(message) {
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
        `${message.author} Atenção! Adicionar um servidor primeiro.`
      );
    }
    var obj = {
      id: message.content.split(" ")[1].toString(),
      content: [],
    };
    var contentJson = dataFile.messages.find((message) => message.id == obj.id);
    if (typeof contentJson !== "undefined") {
      obj = contentJson;
      var indexArray = dataFile.messages.findIndex(
        (message) => message.id == obj.id
      );
      var arr1 = dataFile.messages.slice(0, indexArray);
      if (indexArray == dataFile.messages.length - 1) {
        arr1.unshift(obj);
        dataFile.messages = arr1;
      } else {
        var arr2 = dataFile.messages.slice(
          indexArray + 1,
          dataFile.messages.length
        );
        var newObj = arr1.concat(arr2);
        newObj.unshift(obj);
        dataFile.messages = newObj;
      }
    } else {
      dataFile.messages.unshift(obj);
    }
    Manage.save(dataFile);
    Embed.complete(message, "Mensagem registrada.");
  } catch (e) {
    console.log(e);
    Embed.error(message, "Algo deu errado.\nConsulte o s!help");
  }
}
