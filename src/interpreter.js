//const { searchFunc } = require("./models/functions.js");
const fs = require("fs");

module.exports = async (code, msg, client, args) => {
  var data = [],
    parser = require("./functions/parser.js"),
    //parse = fs.readdirSync("src/functions/all"),
    f;

let searched = []
    function searchFunc(_n, _p) {
      for (const f of _n) {
        const func = _p.filter((filt) => filt == ("$" + f).slice(0, filt.length));

        if (func.length == 1) {
          searched.push(func[0]);
        } else if (func.length > 1) {
          searched.push(func.sort((a, b) => b.length - a.length)[0]);
        }
      }

      return searched;
    }

  var theFuncs = searchFunc(code.split("$"), parser);
  //console.log(theFuncs)
  for (const func of theFuncs.reverse()) {
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
  } else if (
    ["$reply"].some(function (v) {
      return theFuncs.indexOf(v) >= 0;
    })
  ) {
    await client.sendMessage(msg.key.remoteJid, code);
  } else {
    await client.sendMessage(msg.key.remoteJid, {text: code});
  }
};
