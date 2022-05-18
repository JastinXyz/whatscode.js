module.exports = async(d) => {
  try {
    await d.client.groupSettingUpdate(d.msg.key.remoteJid, 'unlock')
  } catch(err) {
    d.isError = true;
    d.error('❌ Failed to unlock')
  }
  return ""
};
