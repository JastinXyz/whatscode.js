module.exports = async(d) => {
  // not stable yet (mybe, if there is a bug I will fix it tomorrow lmao)
  let type;
  d.msg.message.extendedTextMessage? d.msg.message.extendedTextMessage.contextInfo.quotedMessage? type = 'quoted' : type = 'another' : type = 'another'

  if(type === "another") {
    if(d.msg.message.imageMessage || d.msg.message.videoMessage) {
      return true
    } else {
      return false
    }
  } else {
    const q = d.msg.message.extendedTextMessage.contextInfo.quotedMessage;
    const qtype = require('@adiwajshing/baileys').getContentType(q);
    if(qtype === "conversation" || qtype === "buttonsMessage") {
      return false;
    } else {
      return true
    }
  }
};
