const { searchFunc } = require("./models/functions.js");
const fs = require("fs");

module.exports = async (code, msg, client, args) => {
  var data = [],
    parser = require("./functions/parser.js"),
    parse = fs.readdirSync("src/functions/all"),
    f;

  var theFuncs = searchFunc(code.split("$"), parser);
  for (const func of theFuncs) {
    var _iOne = code.split(`${func}[`)[1]
    if(!_iOne) {
      _iOne = ""
    } else {
      _iOne = _iOne.split("]")[0]
    }

      data.push({
        name: func,
        inside: _iOne,
      });

      var d = func.replace("$", "").replace("[", "");

      var all = { data: data, msg: msg, client: client, code: code, args: args };
      var res = await require(`./functions/all/${d}.js`)(all);
      code = code.replaceLast(_iOne? `${func}[${_iOne}]` : func, res)
  }

  if (
    ["$reply"].some(function (v) {
      return theFuncs.indexOf(v) >= 0;
    })
  ) {
    await client.sendMessage(msg.key.remoteJid, {text: code}, { quoted: msg });
  } else {
    await client.sendMessage(msg.key.remoteJid, {text: code});
  }
};
