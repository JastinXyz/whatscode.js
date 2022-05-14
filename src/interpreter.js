const fs = require("fs");

module.exports = async (code, msg, client, args, cmd, db, mentions, r) => {
  var data = [],
    parser = require("./functions/parser.js"),
    obj,
    suppressErr,
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

  var u = {};
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

    var all = { data: data, msg: msg, client: client, code: code, args: args, isError: false, cmd: cmd, unique: false,
      error: (err) => {
        if(!suppressErr) {
          return client.sendMessage(
            msg.key.remoteJid,
            {
              text: `\`\`\`${err}\`\`\``,
            },
            { quoted: msg }
          );
        } else {
          return client.sendMessage(
            msg.key.remoteJid,
            {
              text: `\`\`\`${suppressErr.split("{error}").join(err)}\`\`\``,
            },
            { quoted: msg }
          );
        }
      },
      db: db
     };

    var res = await require(`./functions/all/${d}.js`)(all);

    if(all.unique) {
      if(res.type === "error") {
        suppressErr = res.response
      } else {
          u[res.type] = res.response
      }
    }

    code = code.replaceLast(_iOne ? `${func}[${_iOne}]` : func, res);

    if(all.isError) {
      code = ""
      break;
    };
  }

  if(r) {
    return code
  } else {
    if (
      ["$reply"].some(function (v) {
        return theFuncs.indexOf(v) >= 0;
      })
    ) {
      u.image ? u.templateButtons ? obj = {
        caption: code.trim(),
        footer: u.footer ? u.footer : "",
        templateButtons: u.templateButtons,
        image: {url: u.image},
        mentions: mentions? mentions : ""
      } : obj = {
        image: {url: u.image},
        caption: code.trim(),
        footer: u.footer ? u.footer : "",
        buttons: u.buttons ? u.buttons : "",
        mentions: mentions? mentions : "",
        headerType: 4
      } : u.templateButtons ? obj = {
        text: code.trim(),
        footer: u.footer ? u.footer : "",
        templateButtons: u.templateButtons,
        mentions: mentions? mentions : ""
      } : obj = {
        text: code.trim(),
        buttons: u.buttons ? u.buttons : "",
        footer: u.footer ? u.footer : "",
        mentions: mentions? mentions : "",
        headerType: 1
      }

      code.trim() === ""? undefined : await client.sendMessage(msg.key.remoteJid, obj, { quoted: msg });
    } else if (
      ["$sendButton"].some(function (v) {
        return theFuncs.indexOf(v) >= 0;
      })
    ) {
      const a = JSON.parse(code)
      await client.sendMessage(msg.key.remoteJid, a);
    } else {
      u.image ? u.templateButtons ? obj = {
        caption: code.trim(),
        footer: u.footer ? u.footer : "",
        templateButtons: u.templateButtons,
        image: {url: u.image},
        mentions: mentions? mentions : ""
      } : obj = {
        image: {url: u.image},
        caption: code.trim(),
        footer: u.footer ? u.footer : "",
        buttons: u.buttons ? u.buttons : "",
        mentions: mentions? mentions : "",
        headerType: 4
      } : u.templateButtons ? obj = {
        text: code.trim(),
        footer: u.footer ? u.footer : "",
        templateButtons: u.templateButtons,
        mentions: mentions? mentions : ""
      } : obj = {
        text: code.trim(),
        buttons: u.buttons ? u.buttons : "",
        footer: u.footer ? u.footer : "",
        mentions: mentions? mentions : "",
        headerType: 1
      }

      code.trim() === ""? undefined : await client.sendMessage(msg.key.remoteJid, obj);
    }
  };
  }
