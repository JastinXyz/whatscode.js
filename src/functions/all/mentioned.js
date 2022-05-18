module.exports = async (d) => {
  const { decodeJid, sender } = require("../../models/functions.js");

  const split = d.code.split("$mentioned").length - 1;
  const after = d.code.split("$mentioned")[split];

  if (after.startsWith("[")) {
    const inside = d.code.split("$mentioned[")[1].split("]")[0];
    const [n, jid = "no"] = inside.split(";");

    if (isNaN(n)) {
      d.isError = true;
      d.error("❌ Invalid number in: $mentioned");
    }

    const mentioned = d.msg.message.extendedTextMessage.contextInfo
      ? d.msg.message.extendedTextMessage.contextInfo.mentionedJid
      : "";

    return mentioned.join("").trim() === "" ? "" : mentioned[n - 1] ? jid === "yes" ? mentioned[n - 1] : "@" + mentioned[n - 1].replace("@s.whatsapp.net", "") : "";
  } else {
    d.isError = true;
    d.error("❌ Usage: $mentioned[number;return jid (yes/no) (optional)]");
  }
};
