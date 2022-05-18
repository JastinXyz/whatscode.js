module.exports = async(d) => {
  try {
    await d.client.groupSettingUpdate(d.msg.key.remoteJid, 'not_announcement')
  } catch(err) {
    d.isError = true;
    d.error('❌ Failed to open')
  }
  return ""
};
