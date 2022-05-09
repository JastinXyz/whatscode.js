module.exports = async (m, client, cmd, prefix, getType) => {
  var msg = m.messages[0];
  if (!m || !msg.message) return;
  if (msg.key && msg.key.remoteJid === "status@broadcast") return;
  const type = getType(msg.message);
  var dy =
    type === "conversation" && msg.message.conversation
      ? msg.message.conversation
      : type == "imageMessage" && msg.message.imageMessage.caption
      ? msg.message.imageMessage.caption
      : type == "documentMessage" && msg.message.documentMessage.caption
      ? msg.message.documentMessage.caption
      : type == "videoMessage" && msg.message.videoMessage.caption
      ? msg.message.videoMessage.caption
      : type == "extendedTextMessage" &&
        msg.message.extendedTextMessage.text
      ? msg.message.extendedTextMessage.text
      : type == "buttonsResponseMessage" &&
        msg.message.buttonsResponseMessage.selectedButtonId
      ? msg.message.buttonsResponseMessage.selectedButtonId
      : type == "templateButtonReplyMessage" &&
        msg.message.templateButtonReplyMessage.selectedId
      ? msg.message.templateButtonReplyMessage.selectedId
      : "";
  const args = dy.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    if (cmd.get(command)) {
          require("../interpreter.js")(cmd.get(command), msg, client, args)
        }
    }
