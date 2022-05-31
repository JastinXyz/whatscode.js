module.exports = async(d) => {
  return d.msg.message.extendedTextMessage? d.msg.message.extendedTextMessage.contextInfo.quotedMessage.conversation : ""
};
