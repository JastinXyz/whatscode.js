const fs = require("fs");

module.exports = async (code, msg, client, args) => {
  var data = [],
    parser = require("./functions/parser.js"),
    f;

  let searched = [];
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
  for (const func of theFuncs.reverse()) {
    var _iOne = code.split(`${func}[`)[1];
    if (!_iOne) {
      _iOne = "";
    } else {
      _iOne = _iOne.split("]")[0];
    }

    data.push({
      name: func,
      inside: _iOne,
    });

    var d = func.replace("$", "").replace("[", "");

    var all = { data: data, msg: msg, client: client, code: code, args: args, isError: false };
    var res = await require(`./functions/all/${d}.js`)(all);
    code = code.replaceLast(_iOne ? `${func}[${_iOne}]` : func, res);
    if(all.isError) {
      code = ""
      break;
    };
  }

  if (
    ["$reply"].some(function (v) {
      return theFuncs.indexOf(v) >= 0;
    })
  ) {
    code.trim() === ""? undefined : await client.sendMessage(msg.key.remoteJid, { text: code.trim() }, { quoted: msg });
  } // else if (
  //   ["$sendButton"].some(function (v) {
  //     return theFuncs.indexOf(v) >= 0;
  //   })
  // ) {
  // //  console.log(JSON.parse(code));
  //   const a = JSON.parse(code)
  //   await client.sendMessage(msg.key.remoteJid, {
  //     text: a.text,
  //     buttons: a.buttons[0],
  //     footer: a.footer,
  //     headerType: a.headerType,
  //   });
  //}
   else {
    code.trim() === ""? undefined : await client.sendMessage(msg.key.remoteJid, { text: code.trim() });
  }
};
