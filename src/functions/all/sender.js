module.exports = async (d) => {
  return d.msg.key.fromMe
    ? d.client.user.jid
    : d.msg.participant
    ? d.msg.participant
    : d.msg.key.participant
    ? d.msg.key.participant
    : d.msg.key.remoteJid;
};
