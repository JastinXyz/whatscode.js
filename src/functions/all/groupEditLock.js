module.exports = async(d) => {
  try {
    await d.client.groupSettingUpdate(d.msg.key.remoteJid, 'locked')
  } catch(err) {
    d.isError = true;
    d.error('❌ Failed to lock')
  }
  return ""
};
