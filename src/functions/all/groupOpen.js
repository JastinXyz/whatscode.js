module.exports = async(d) => {
  await d.client.groupSettingUpdate(d.msg.key.remoteJid, 'not_announcement')
  return ""
};
