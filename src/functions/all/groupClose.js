module.exports = async(d) => {
  try {
    await d.client.groupSettingUpdate(d.msg.key.remoteJid, 'announcement')
  } catch(err) {
    d.isError = true;
    d.error('❌ Failed to close')
  }
  return ""
};
