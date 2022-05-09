module.exports = async (d) => {
  // const r = d.command.code.split("$reply").length
  // if (r >= 3) return d.client.sendMessage(`\`\`\`❌ | [whatscode.js] Can't use more than one $reply.\`\`\``)

  var parser = require("../parser.js"),
      inside = d.code.split("$reply[")[1].split("]")[0],
      { searchFunc } = require("../../models/functions.js");

  var isFunc = searchFunc(inside.split("$"), parser);
  console.log(isFunc)
  if(!isFunc) {
    return inside
  } else {
    return ""
  }
};
