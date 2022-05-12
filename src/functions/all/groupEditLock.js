module.exports = async(d) => {
  await d.client.groupSettingUpdate(d.msg.key.remoteJid, 'locked')
  return ""
};
