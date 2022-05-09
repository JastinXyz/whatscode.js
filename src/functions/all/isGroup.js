module.exports = async (d) => {
  return d.msg.key.remoteJid.endsWith("@g.us");
};
