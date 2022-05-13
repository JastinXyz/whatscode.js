module.exports = async (d) => {
  const { decodeJid } = require("../../models/functions.js");
  const inside = d.code.split("$onlySender[")[1].split("]")[0];
  const [
    error = "You can't use this command because only a few people can use it.",
    ...num
  ] = inside.split(";");

  if (!num)
    return d.error(
      `❌ [whatscode.js] | Usage: $onlySender[error (optional);123@s.whatsapp.net]!`
    );

  const decoded = await decodeJid(
    d.msg.key.fromMe
      ? d.client.user.jid
      : d.msg.participant
      ? d.msg.participant
      : d.msg.key.participant
      ? d.msg.key.participant
      : d.msg.key.remoteJid
  );
  const c = num.includes(decoded);
  if (!c) {
    d.isError = true;

    return d.client.sendMessage(
      d.msg.key.remoteJid,
      { text: error },
      { quoted: d.msg }
    );
  } else {
    return "";
  }
};
