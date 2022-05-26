module.exports = async (u, t) => {
  const { decodeJid } = require("../../models/functions.js");
  const cmds = t.userJoin.values();
  for (const cmd of cmds) {
    var gjid = cmd?.groupJid;

    for (var a of Object.keys(u)) {
      var jid = decodeJid(u.participants);
      var groupJid = decodeJid(u.id);
    }

    if (cmd?.groupJid?.includes("$")) {
      gjid = await require("../../interpreter.js")(
        cmd?.groupJid,
        t.m.messages[0],
        t.whats,
        "",
        t.userJoin,
        t.db,
        "",
        true
      );
    }

    if (gjid.includes(groupJid)) {
      const groupN = await t.whats.groupMetadata(groupJid);
      await require("../../interpreter.js")(
        cmd?.code
          .split("{userJid}")
          .join(jid)
          .split("{groupJid}")
          .join(groupJid)
          .split("{user}")
          .join(`@${jid.join(" ").replace("@s.whatsapp.net", "")}`)
          .split("{group}")
          .join(groupN.subject),
        t.m.messages[0],
        t.whats,
        "",
        t.userJoin,
        t.db,
        jid
      );
    }
  }
};
