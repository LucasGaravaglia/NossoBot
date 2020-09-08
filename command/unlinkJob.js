import Manage from "../manageFile.js";
import Embed from "./embed.js";
export default function unlinkJob(message) {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return Embed.error(
      message,
      `${message.author} Você não tem permissão para usar este comando.`
    );
  }
  try {
    var ListOfOffice = Manage.load();
    var reactionTempId = message.content.split(":");
    var ListRemove = {
      cargoID: message.content.split(" ")[1].toString(),
      reactionID: reactionTempId[Object.keys(reactionTempId).length - 1]
        .toString()
        .slice(0, -1),
    };
    var contentJson = ListOfOffice.messages[0].content.find(
      (content) => content.cargoID == ListRemove.cargoID
    );
    if (typeof contentJson !== "undefined") {
      var indexArray = ListOfOffice.messages[0].content.findIndex(
        (content) => content.cargoID == ListRemove.cargoID
      );

      if (indexArray == 0) {
        ListOfOffice.messages[0].content = ListOfOffice.messages[0].content.slice(
          1
        );
      } else {
        var arr1 = ListOfOffice.messages[0].content.slice(0, indexArray);
        if (indexArray == ListOfOffice.messages[0].content.length - 1) {
          ListOfOffice.messages[0].content = arr1;
        } else {
          var arr2 = ListOfOffice.messages[0].content.slice(
            indexArray + 1,
            ListOfOffice.messages.length
          );

          ListOfOffice.messages[0].content = arr1.concat(arr2);
        }
      }
    } else {
      Embed.error(
        "emoji não consta na lista.\nConsultar o s!help ou o programador."
      );
      return;
    }
    Manage.save(ListOfOffice);
    Embed.complete(
      message,
      `${message.content.split(" ")[1]} desvinculado ao emoji :${
        reactionTempId[Object.keys(reactionTempId).length - 2]
      }:`
    );
  } catch (e) {
    console.log(e);
    Embed.error(message, "Algo deu errado.\nConsulte o s!help");
  }
}
