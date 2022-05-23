module.exports = async (d) => {
  const inside = d.inside;
  const { decodeJid, sender } = require("../../models/functions.js");
  if (!inside) {
    d.isError = true;
    return d.error("❌ Usage: $mentioned[number;return jid (yes/no) (optional)]");
  } else {
    const [n, jid = "no"] = inside.split(";");

    if (isNaN(n)) {
      d.isError = true;
      return d.error("❌ Invalid number in: $mentioned");
    }

    var mentioned = d.msg.message.extendedTextMessage
      ? d.msg.message.extendedTextMessage.contextInfo.mentionedJid
      : "";

    return mentioned === ""
      ? ""
      : mentioned[n - 1]
      ? jid === "yes"
        ? mentioned[n - 1]
        : "@" + mentioned[n - 1].replace("@s.whatsapp.net", "")
      : "";
  }
};
