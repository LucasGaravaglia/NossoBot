import Manage from "./manageFile.js";

function linkJobWithReaction(message) {
  var ListOfOffice = Manage.load();
  var newList = {
    cargoID: message.content.split(" ")[1].toString(),
    reactionID: message.content.split(" ")[2].toString(),
  };
  ListOfOffice.push(newList);
  Manage.save(ListOfOffice);
}
function setConfig(message) {
  const obj = {
    chatID: message.content.split(" ")[1].toString(),
    serverID: message.content.split(" ")[2].toString(),
  };
  Manage.save(obj, "./configServer.json");
}
async function assignReactions(data, client) {
  if (data.t !== "MESSAGE_REACTION_ADD" && data.t !== "MESSAGE_REACTION_REMOVE")
    return;
  const config = Manage.load("./configServer.json");
  if (data.d.message_id != config.chatID) return;

  const param = Manage.load();
  const Guild = client.guilds.fetch(config.serverID);
  const member = (await Guild).member(data.d.user_id);

  let cargo;

  if (data.t === "MESSAGE_REACTION_ADD") {
    for (let i = 0; i < Object.keys(param).length; i++) {
      if (data.d.emoji.id == parseInt(param[i].reactionID)) {
        cargo = (await Guild).roles.fetch(param[i].cargoID.slice(3, -1));
        cargo.then((data) => {
          member.roles.add(data);
        });
      }
    }
  }

  if (data.t === "MESSAGE_REACTION_REMOVE") {
    for (let i = 0; i < Object.keys(param).length; i++) {
      if (data.d.emoji.id == parseInt(param[i].reactionID)) {
        cargo = (await Guild).roles.fetch(param[i].cargoID.slice(3, -1));
        cargo.then((data) => {
          member.roles.remove(data);
        });
      }
    }
  }
}

export default {
  linkJobWithReaction,
  assignReactions,
  setConfig,
};
