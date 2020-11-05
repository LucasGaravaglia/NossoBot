import Manage from "../manageFile.js";
export default async function assignReactions(data, client) {
  if (data.t !== "MESSAGE_REACTION_ADD" && data.t !== "MESSAGE_REACTION_REMOVE")
    return;
  const configJson = Manage.load();
  let flag = true;
  var param;
  configJson.messages.forEach((element) => {
    if (element.id == data.d.message_id) {
      flag = false;
      param = element.content;
    }
  });
  if (flag) return;

  const Guild = client.guilds.fetch(configJson.serverID);
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
