import fs from "fs";
const FilePath = "./data.json";

function save(content, path = FilePath) {
  const contentString = JSON.stringify(content, null, 2);
  return fs.writeFileSync(path, contentString);
}
function load(path = FilePath) {
  const fileBuffer = fs.readFileSync(path, "utf-8");
  const contentJSON = JSON.parse(fileBuffer);
  return contentJSON;
}

export default {
  save,
  load,
};
