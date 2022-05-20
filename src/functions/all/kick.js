module.exports = async (d) => {
  const inside = d.inside;
  const [...num] = inside.split(";");
  const { decodeJid, sender } = require("../../models/functions.js");
  const s = await decodeJid(sender(d));

  try {
    await d.client.groupParticipantsUpdate(
      d.msg.key.remoteJid,
      inside == "" ? s : num,
      "remove"
    );
  } catch (err) {
    d.isError = true;
    return d.error("❌ Failed to kick " + inside == "" ? s : num.join(", "));
  }

  return "";
};
